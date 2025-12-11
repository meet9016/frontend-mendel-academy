export const saveToken = (token: string) => {
  if (typeof window === "undefined") return;
  localStorage.setItem('auth_token', token);
};

export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem('auth_token');
};

export const clearToken = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem('auth_token');
};

export const saveUserId = (id: string) => {
  if (typeof window === "undefined") return;
  localStorage.setItem('auth_id', id);
};

export const getAuthId = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem('auth_id');
};

export const clearAuthId = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem('auth_id');
};
