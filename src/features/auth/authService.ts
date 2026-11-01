import { apiClient } from '@/api/client';
import type { User } from './types';
import type { ApiResponse } from '@/types/api.types';

interface LoginPayload {
  username: string;
  password: string;
}

export const loginApi = async (
  payload: LoginPayload,
): Promise<ApiResponse<User>> => {
  const response = await apiClient.post<ApiResponse<User>>(
    '/auth/login',
    payload,
  );

  return response.data;
};

export const refreshTokenApi = async (): Promise<ApiResponse<never>> => {
  const response = await apiClient.post<ApiResponse<never>>('/auth/refresh');

  return response.data;
};

export const logoutApi = async (): Promise<ApiResponse<never>> => {
  const response = await apiClient.post<ApiResponse<never>>('/auth/logout');

  return response.data;
};

export const getCurrentUserApi = async (): Promise<ApiResponse<User>> => {
  const response = await apiClient.get<ApiResponse<User>>('/auth/me');

  return response.data;
};
