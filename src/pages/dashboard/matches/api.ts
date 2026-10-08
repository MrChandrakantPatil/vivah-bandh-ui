import { apiClient } from '@/api/client';
import type { MatchesResponse } from './types';
import type { MatchFiltersState } from '@/components/Filters/types';
import { buildMatchQueryParams } from './utils';

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
