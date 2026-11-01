export type FilterOption = string | { value: string; label: string };

export interface SelectOption {
  label: string;
  value: string;
}

export type SelectedMoreFilters = Record<string, string>;

export interface MatchFiltersState {
  age: string[];
  location: string[];
  religion: string[];
  community: string[];
  education: string[];
  moreFilters: SelectedMoreFilters;
}

export interface Paginations {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}