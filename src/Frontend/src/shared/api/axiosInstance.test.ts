import axios from "axios";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { axiosInstance } from "./axiosInstance";
import { API_ENDPOINTS } from "./endpoints";
import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from "./tokenStorage";

// ── Queue-based mock adapter ───────────────────────────────────────────────────
// Each call to axiosInstance pops the next handler from the queue.
type Handler = (config: any) => Promise<any>;
const handlers: Handler[] = [];

const makeSuccess =
  (data: unknown = {}): Handler =>
  (config) =>
    Promise.resolve({
      data,
      status: 200,
      statusText: "OK",
      headers: {},
      config,
    });

const make401 = (): Handler => (config) =>
  Promise.reject(
    Object.assign(new Error("Request failed with status code 401"), {
      isAxiosError: true,
      config,
      response: { status: 401, data: {}, headers: {}, config },
    }),
  );

const make500 = (): Handler => (config) =>
  Promise.reject(
    Object.assign(new Error("Request failed with status code 500"), {
      isAxiosError: true,
      config,
      response: { status: 500, data: {}, headers: {}, config },
    }),
  );

// ── Setup / teardown ──────────────────────────────────────────────────────────
beforeEach(() => {
  handlers.length = 0;
  clearAccessToken();
  vi.stubGlobal("window", { location: { replace: vi.fn() } });

  // @ts-expect-error – override the adapter for testing
  axiosInstance.defaults.adapter = (config: any) => {
    const next = handlers.shift();
    if (!next) throw new Error("No adapter handler queued for this request");
    return next(config);
  };
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

// ── Request interceptor ───────────────────────────────────────────────────────
describe("request interceptor", () => {
  it("does not attach Authorization when no token is stored", async () => {
    let captured: any;
    handlers.push((config) => {
      captured = config;
      return Promise.resolve({
        data: {},
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      });
    });

    await axiosInstance.get("/test");

    expect(captured.headers.Authorization).toBeUndefined();
  });

  it("attaches Bearer token when a token is stored", async () => {
    setAccessToken("my-jwt");

    let captured: any;
    handlers.push((config) => {
      captured = config;
      return Promise.resolve({
        data: {},
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      });
    });

    await axiosInstance.get("/test");

    expect(captured.headers.Authorization).toBe("Bearer my-jwt");
  });
});

// ── Response interceptor ──────────────────────────────────────────────────────
describe("response interceptor", () => {
  it("passes non-401 errors through without triggering refresh", async () => {
    handlers.push(make500());

    await expect(axiosInstance.get("/test")).rejects.toMatchObject({
      response: { status: 500 },
    });
  });

  it("calls the refresh endpoint and retries the original request on 401", async () => {
    handlers.push(make401());
    handlers.push(makeSuccess({ hello: "world" }));

    vi.spyOn(axios, "post").mockResolvedValueOnce({
      data: { accessToken: "new-token" },
    });

    const res = await axiosInstance.get("/test");

    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining(API_ENDPOINTS.auth.refresh),
      {},
      { withCredentials: true },
    );
    expect(res.data).toEqual({ hello: "world" });
  });

  it("sets the refreshed token as Authorization on the retried request", async () => {
    handlers.push(make401());

    let capturedRetry: any;
    handlers.push((config) => {
      capturedRetry = config;
      return Promise.resolve({
        data: {},
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      });
    });

    vi.spyOn(axios, "post").mockResolvedValueOnce({
      data: { accessToken: "refreshed-token" },
    });

    await axiosInstance.get("/test");

    expect(capturedRetry.headers.Authorization).toBe("Bearer refreshed-token");
  });

  it("clears the stored token and redirects to /login when refresh fails", async () => {
    setAccessToken("stale-token");
    handlers.push(make401());

    vi.spyOn(axios, "post").mockRejectedValueOnce(new Error("Refresh failed"));

    await expect(axiosInstance.get("/test")).rejects.toThrow("Refresh failed");

    expect(window.location.replace).toHaveBeenCalledWith("/login");
    expect(getAccessToken()).toBeNull();
  });

  it("does not refresh again when the retried request also returns 401", async () => {
    handlers.push(make401()); // initial request
    handlers.push(make401()); // retry after refresh also fails

    vi.spyOn(axios, "post").mockResolvedValueOnce({
      data: { accessToken: "new-token" },
    });

    await expect(axiosInstance.get("/test")).rejects.toMatchObject({
      response: { status: 401 },
    });

    // Refresh was attempted exactly once — the second 401 (on the retry)
    // is blocked by the _retry flag and does not trigger another refresh.
    expect(axios.post).toHaveBeenCalledTimes(1);
  });

  it("queues concurrent 401s and retries all after a single refresh call", async () => {
    handlers.push(make401()); // req A → 401
    handlers.push(make401()); // req B → 401
    handlers.push(makeSuccess({ id: "A" })); // req A retry
    handlers.push(makeSuccess({ id: "B" })); // req B retry

    vi.spyOn(axios, "post").mockResolvedValueOnce({
      data: { accessToken: "shared-token" },
    });

    const [resA, resB] = await Promise.all([
      axiosInstance.get("/a"),
      axiosInstance.get("/b"),
    ]);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect([resA.data, resB.data]).toContainEqual({ id: "A" });
    expect([resA.data, resB.data]).toContainEqual({ id: "B" });
  });
});
