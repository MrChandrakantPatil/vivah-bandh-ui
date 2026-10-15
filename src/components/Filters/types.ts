import type { Dispatch, SetStateAction } from 'react';
import type { LucideIcon } from 'lucide-react';

export type FilterOptionItem = string | { value: string; label: string };

export type MultiSelectFilterProps = {
  title: string;
  icon: LucideIcon;
  options: string[];
  selectedOptions: string[];
  setSelectedOptions: (options: string[]) => void;
};

export type MoreFilterOption = {
  key: string;
  title: string;
  icon: LucideIcon;
  options: FilterOptionItem[];
};

export type SelectedMoreFilters = Record<string, string>;

export type MoreFiltersProps = {
  title?: string;
  icon?: LucideIcon;
  options: MoreFilterOption[];
  selectedFilters: SelectedMoreFilters;
  setSelectedFilters: Dispatch<SetStateAction<SelectedMoreFilters>>;
};

export interface MatchFiltersState {
  age: string[];
  location: string[];
  religion: string[];
  community: string[];
  education: string[];
  moreFilters: SelectedMoreFilters;
}

export const initialMatchFilters: MatchFiltersState = {
  age: [],
  location: [],
  religion: [],
  community: [],
  education: [],
  moreFilters: {},
};
