export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
  },
  user: {
    get: "/user/profile",
    create: "/user/profile",
    update: "/user/profile",
    delete: "/user/profile",
    exists: "/user/exists",
  },
  fridge: {
    getAll: "/fridge/snacks",
    create: "/fridge/snacks",
    update: (id: string) => `/fridge/snacks/${id}`,
    delete: (id: string) => `/fridge/snacks/${id}`,
  },
} as const;
