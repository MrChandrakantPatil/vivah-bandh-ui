import { apiClient } from '@/api/client';
import { buildMatchQueryParams } from './utils';
import type { MatchFiltersState, Paginations } from '@/types/common.types';
import type { MatchProfile } from '@/types/profile.types';

export interface MatchesResponse {
  success: boolean;
  message: string;
  data: {
    matches: MatchProfile[];
    pagination: Paginations;
  };
}

export const getRecommendedMatches = async (
  filters: MatchFiltersState,
  sortBy: string,
  search: string,
  page: number,
  limit: number,
): Promise<MatchesResponse> => {
  const response = await apiClient.get('/v1/matches/recommended', {
    params: {
      ...buildMatchQueryParams(filters),
      sortBy,
      ...(search.trim() && { search: search.trim() }),
      page,
      limit,
    },
  });

  return response.data;
};

export const getNewMatches = async (
  filters: MatchFiltersState,
  sortBy: string,
  search: string,
  page: number,
  limit: number,
): Promise<MatchesResponse> => {
  const response = await apiClient.get('/v1/matches/new', {
    params: {
      ...buildMatchQueryParams(filters),
      sortBy,
      ...(search.trim() && { search: search.trim() }),
      page,
      limit,
    },
  });

  return response.data;
};

export const shortlistProfile = async (candidateUserId: string) => {
  const response = await apiClient.post(
    `/v1/matches/shortlist/${candidateUserId}`,
  );

  return response.data;
};

export const unshortlistProfile = async (candidateUserId: string) => {
  const response = await apiClient.delete(
    `/v1/matches/shortlist/${candidateUserId}`,
  );

  return response.data;
};

export const getShortlistedProfiles = async (
  filters: MatchFiltersState,
  sortBy: string,
  search: string,
  page: number,
  limit: number,
): Promise<MatchesResponse> => {
  const response = await apiClient.get('/v1/matches/shortlist', {
    params: {
      ...buildMatchQueryParams(filters),
      sortBy,
      ...(search.trim() && { search: search.trim() }),
      page,
      limit,
    },
  });

  return response.data;
};
