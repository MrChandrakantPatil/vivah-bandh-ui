import { useState, useEffect, useCallback } from 'react';
import type { Dispatch, SetStateAction } from 'react';

import { initialMatchFilters } from '@/components/Filters/types';
import type { MatchFiltersState } from '@/components/Filters/types';
import type { MatchProfile } from '../../../matches/types';
import type { Paginations } from '@/components/Pagination/types';

import { Pagination } from '@/components/Pagination';
import { MatchFilters } from '../MatchFilters';
import { DataState } from '../DataState';
import { MatchCard } from '../MatchCard';

import { getShortlistedProfiles } from '../../api';

export function ShortlistedMatches() {
  const [matches, setMatches] = useState<MatchProfile[]>([]);
  const [filters, setFilters] =
    useState<MatchFiltersState>(initialMatchFilters);
  const [sortBy, setSortBy] = useState('bestMatch');

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

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

      const response = await getShortlistedProfiles(
        filters,
        sortBy,
        debouncedSearch,
        page,
        limit,
      );

      setMatches(response.data.shortlist);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Failed to fetch recommended matches:', error);

      setError('Unable to fetch recommended matches');
    } finally {
      setIsLoading(false);
    }
  }, [filters, sortBy, debouncedSearch, page, limit]);

  useEffect(() => {
    const fetchMatches = async () => {
      await loadMatches();
    };

    fetchMatches();
  }, [loadMatches]);

  const handleRetry = () => {
    void loadMatches();
  };

  const handleShortlistChange = (
    candidateUserId: string,
    isShortlisted: boolean,
  ) => {
    if (!isShortlisted) {
      setMatches((prevMatches) => {
        const updatedMatches = prevMatches.filter(
          (match) => match.userId !== candidateUserId,
        );

        // If current page becomes empty and we're not
        // already on the first page, go to previous page.
        if (updatedMatches.length === 0 && page > 1) {
          setPage((prevPage) => prevPage - 1);
        }

        return updatedMatches;
      });

      return;
    }

    setMatches((prevMatches) =>
      prevMatches.map((match) =>
        match.userId === candidateUserId
          ? {
              ...match,
              isShortlisted: true,
            }
          : match,
      ),
    );
  };

  return (
    <div className="w-full">
      <MatchFilters
        filters={filters}
        setFilters={handleFiltersChange}
        sortBy={sortBy}
        setSortBy={handleSortChange}
        search={search}
        setSearch={handleSearchChange}
      />

      <DataState
        isLoading={isLoading}
        error={error}
        isEmpty={matches.length === 0}
        loadingText="Loading shortlisted matches..."
        emptyMessage="No shortlisted matches found."
        onRetry={handleRetry}
      />

      {!isLoading && !error && matches.length > 0 && (
        <>
          <div
            className="
              grid grid-cols-1 gap-4
              sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 lg:gap-8
            "
          >
            {matches.map((user) => (
              <MatchCard
                key={user.userId}
                match={user}
                onShortlistChange={handleShortlistChange}
              />
            ))}
          </div>

          {pagination && pagination.totalPages > 1 && (
            <Pagination pagination={pagination} setPage={setPage} />
          )}
        </>
      )}
    </div>
  );
}
