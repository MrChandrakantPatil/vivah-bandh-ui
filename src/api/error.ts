export interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
    status?: number;
  };
}

export function isApiError(error: unknown): error is ApiError {
  return typeof error === 'object' && error !== null && 'response' in error;
}
