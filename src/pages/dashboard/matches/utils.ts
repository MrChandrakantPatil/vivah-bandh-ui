import type { MatchFiltersState } from '@/components/Filters/types';

const buildArrayParams = (value: string[]) => {
  return value.length > 0 ? value.join(',') : undefined;
};

export const getMinMaxRange = (ranges: string[]) => {
  const parsedRanges = ranges.map((range) => {
    const [min, max] = range.split('-').map((value) => Number(value.trim()));

    return {
      min,
      max,
    };
  });

  return {
    min:
      parsedRanges.length > 0
        ? Math.min(...parsedRanges.map((range) => range.min))
        : undefined,

    max:
      parsedRanges.length > 0
        ? Math.max(...parsedRanges.map((range) => range.max))
        : undefined,
  };
};

export const buildMatchQueryParams = (filters: MatchFiltersState) => {
  const { min: minAge, max: maxAge } = getMinMaxRange(filters.age);

  const { min: minHeight, max: maxHeight } = getMinMaxRange(
    filters.moreFilters.height ? [filters.moreFilters.height] : [],
  );

  return {
    minAge,
    maxAge,

    location: buildArrayParams(filters.location),
    religion: buildArrayParams(filters.religion),
    community: buildArrayParams(filters.community),
    education: buildArrayParams(filters.education),

    minHeight,
    maxHeight,

    occupation: filters.moreFilters.occupation || undefined,
    maritalStatus: filters.moreFilters.maritalStatus || undefined,
    familyType: filters.moreFilters.familyType || undefined,
    hobbies: filters.moreFilters.hobbies || undefined,
    annualIncome: filters.moreFilters.annualIncome || undefined,
    lifestyle: filters.moreFilters.lifestyle || undefined,
  };
};
