import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { MatchFiltersState } from '@/components/Filters/types';
import {
  Calendar,
  GraduationCap,
  Landmark,
  MapPin,
  UsersRound,
} from 'lucide-react';

import {
  ageOptions,
  locationOptions,
  religionOptions,
  communityOptions,
  educationOptions,
  moreFilterOptions,
  sortOptions,
} from '@/data';

import { MultiSelectFilter } from '@/components/Filters/MultiSelectFilter';
import { MoreFilters } from '../../../../components/Filters/MoreFilters';
import { SortBy } from './SortBy';
import { ProfileSearch } from './ProfileSearch';

type MatchFiltersProps = {
  filters: MatchFiltersState;
  setFilters: Dispatch<SetStateAction<MatchFiltersState>>;
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
};

export function MatchFilters({
  filters,
  setFilters,
  sortBy,
  setSortBy,
  search,
  setSearch,
}: MatchFiltersProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchOpen = () => {
    setIsSearchOpen(true);
  };

  const handleSearchClose = () => {
    setSearch('');
    setIsSearchOpen(false);
  };

  return (
    <div
      className="
        relative
        w-full py-3 mb-4
        border-b border-gray-200
        sm:py-4 lg:py-5 sm:mb-6 lg:mb-8
      "
    >
      <div className="flex items-center gap-2 w-full">
        <div className="flex-1 min-w-0 overflow-x-auto hide-scrollbar">
          <div className="flex items-center gap-2 w-max">
            <MultiSelectFilter
              title="Age"
              icon={Calendar}
              options={ageOptions}
              selectedOptions={filters.age}
              setSelectedOptions={(value) =>
                setFilters((previous) => ({
                  ...previous,
                  age: value,
                }))
              }
            />

            <MultiSelectFilter
              title="Location"
              icon={MapPin}
              options={locationOptions}
              selectedOptions={filters.location}
              setSelectedOptions={(value) =>
                setFilters((previous) => ({
                  ...previous,
                  location: value,
                }))
              }
            />

            <MultiSelectFilter
              title="Religion"
              icon={Landmark}
              options={religionOptions}
              selectedOptions={filters.religion}
              setSelectedOptions={(value) =>
                setFilters((previous) => ({
                  ...previous,
                  religion: value,
                }))
              }
            />

            <MultiSelectFilter
              title="Community"
              icon={UsersRound}
              options={communityOptions}
              selectedOptions={filters.community}
              setSelectedOptions={(value) =>
                setFilters((previous) => ({
                  ...previous,
                  community: value,
                }))
              }
            />

            <MultiSelectFilter
              title="Education"
              icon={GraduationCap}
              options={educationOptions}
              selectedOptions={filters.education}
              setSelectedOptions={(value) =>
                setFilters((previous) => ({
                  ...previous,
                  education: value,
                }))
              }
            />

            <MoreFilters
              options={moreFilterOptions}
              selectedFilters={filters.moreFilters}
              setSelectedFilters={(value) =>
                setFilters((previous) => ({
                  ...previous,
                  moreFilters:
                    typeof value === 'function'
                      ? value(previous.moreFilters)
                      : value,
                }))
              }
            />
          </div>
        </div>

        <SortBy options={sortOptions} value={sortBy} onChange={setSortBy} />

        <ProfileSearch
          value={search}
          onChange={setSearch}
          isOpen={isSearchOpen}
          onOpen={handleSearchOpen}
          onClose={handleSearchClose}
        />
      </div>
    </div>
  );
}
