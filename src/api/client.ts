import axios, { type InternalAxiosRequestConfig } from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshClient = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

type RetryConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

let refreshPromise: Promise<void> | null = null;

const authEndpoints = ['/auth/login', '/auth/refresh', '/auth/logout'];

apiClient.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as RetryConfig | undefined;
    const status = error.response?.status;
    const requestUrl = originalRequest?.url ?? '';

    const isAuthEndpoint = authEndpoints.some((endpoint) =>
      requestUrl.includes(endpoint),
    );

    if (
      status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      isAuthEndpoint
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      // Concurrent 401 responses share the same refresh request.
      if (!refreshPromise) {
        refreshPromise = refreshClient
          .post('/auth/refresh')
          .then(() => undefined)
          .finally(() => {
            refreshPromise = null;
          });
      }

      await refreshPromise;

      // The backend should now have issued a fresh access cookie.
      return apiClient.request(originalRequest);
    } catch (refreshError) {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('auth:session-expired'));
      }

      return Promise.reject(refreshError);
    }
  },
);
