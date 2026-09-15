import { useCallback, useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

import { initialMatchFilters } from '@/components/Filters/types';
import type { MatchFiltersState } from '@/components/Filters/types';
import type { MatchProfile } from '../types';
import type { Paginations } from '@/components/Pagination/types';

import { getMatches, type MatchType } from '../api';

type UseMatchesProps = {
  matchType: MatchType;
};

export const useMatches = ({ matchType }: UseMatchesProps) => {
  const [filters, setFilters] =
    useState<MatchFiltersState>(initialMatchFilters);
  const [sortBy, setSortBy] = useState('bestMatch');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [matches, setMatches] = useState<MatchProfile[]>([]);
  const [pagination, setPagination] = useState<Paginations | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(15);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleFiltersChange: Dispatch<SetStateAction<MatchFiltersState>> = (
    value,
  ) => {
    setPage(1);
    setFilters(value);
  };

  const handleSortChange: Dispatch<SetStateAction<string>> = (value) => {
    setPage(1);
    setSortBy(value);
  };

  const handleSearchChange: Dispatch<SetStateAction<string>> = (value) => {
    setPage(1);
    setSearch(value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  const loadMatches = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await getMatches(
        matchType,
        filters,
        sortBy,
        debouncedSearch,
        page,
        limit,
      );

      setMatches(response.data.matches);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error(`Failed to fetch ${matchType}:`, error);

      setError(`Unable to fetch ${matchType}`);
    } finally {
      setIsLoading(false);
    }
  }, [matchType, filters, sortBy, debouncedSearch, page, limit]);

  useEffect(() => {
    const fetchMatches = async () => {
      await loadMatches();
    };

    fetchMatches();
  }, [loadMatches]);

  const handleRetry = () => {
    void loadMatches();
  };

  return {
    filters,
    setFilters: handleFiltersChange,

    sortBy,
    setSortBy: handleSortChange,

    search,
    setSearch: handleSearchChange,

    matches,
    pagination,

    page,
    setPage,

    isLoading,
    error,

    handleRetry,
  };
};
