const TOKEN_KEY = "access_token";

export const getAccessToken = (): string | null => {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${TOKEN_KEY}=`));
  return match ? match.split("=")[1] : null;
};

export const setAccessToken = (token: string): void => {
  document.cookie = `${TOKEN_KEY}=${token}; path=/; SameSite=Strict`;
};

export const clearAccessToken = (): void => {
  document.cookie =
    `${TOKEN_KEY}=; path=/; SameSite=Strict; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};
