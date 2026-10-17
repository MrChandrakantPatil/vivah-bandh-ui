import { apiClient } from '@/api/client';
import type { ProfileDetailsData } from './types';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const getMatchProfileDetailsApi = async (
  userId: string,
): Promise<ApiResponse<ProfileDetailsData>> => {
  const response = await apiClient.get<ApiResponse<ProfileDetailsData>>(
    `/v1/matches/${encodeURIComponent(userId)}/profile`,
  );

  return response.data;
};
