import { apiClient } from '../../api/client';

import type { ApiResponse, Profile, User } from './types';

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

export const getCurrentUserApi = async () => {
  const response = await apiClient.get<ApiResponse<User>>('/auth/me');

  return response.data;
};

export const getProfileApi = async (): Promise<ApiResponse<Profile>> => {
  const response = await apiClient.get<ApiResponse<Profile>>('/profile/me');

  return response.data;
};
