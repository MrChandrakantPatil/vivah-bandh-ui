import { apiClient } from '@/api/client';
import type { ApiResponse } from '@/types/api.types';

import type { ProfileDetailsData } from './types';

export const getMatchProfileDetailsApi = async (
  userId: string,
): Promise<ApiResponse<ProfileDetailsData>> => {
  const response = await apiClient.get<ApiResponse<ProfileDetailsData>>(
    `/v1/matches/${encodeURIComponent(userId)}/profile`,
  );

  return response.data;
};
