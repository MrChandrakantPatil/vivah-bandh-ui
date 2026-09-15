import type { Dispatch, ElementType, SetStateAction } from 'react';

export type MultiSelectFilterProps = {
  title: string;
  icon: ElementType;
  options: string[];
  selectedOptions: string[];
  setSelectedOptions: (options: string[]) => void;
};

export type MoreFilterOption = {
  key: string;
  title: string;
  icon: ElementType;
  options: string[];
};

export type SelectedMoreFilters = Record<string, string>;

export type MoreFiltersProps = {
  title?: string;
  icon?: ElementType;
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
