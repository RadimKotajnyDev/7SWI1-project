export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    refresh: "/auth/refresh",
  },
  userProfile: {
    get: "/userProfile",
    create: "/userProfile",
  },
} as const;
