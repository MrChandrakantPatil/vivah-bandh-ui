import { useEffect, useRef, useState } from 'react';

import type { Dispatch, SetStateAction } from 'react';

import {
  Calendar,
  GraduationCap,
  Landmark,
  MapPin,
  UsersRound,
} from 'lucide-react';

import { MultiSelectFilter } from '@/components/Filters/MultiSelectFilter';

import {
  ageOptions,
  locationOptions,
  religionOptions,
  communityOptions,
  educationOptions,
  moreFilterOptions,
} from '@/pages/dashboard/matches/data';

import type { SelectedMoreFilters } from '@/components/Filters/types';

import { MoreFilters } from '../../../../../components/Filters/MoreFilters';
import { SortBy } from './SortBy';
import { ProfileSearch } from './ProfileSearch';

const sortOptions = [
  {
    label: 'Best Match',
    value: 'best-match',
  },
  {
    label: 'Recently Joined',
    value: 'recently-joined',
  },
  {
    label: 'Profile Updated',
    value: 'profile-updated',
  },
];

type MatchFiltersProps = {
  selectedAge: string[];
  setSelectedAge: (options: string[]) => void;

  selectedLocation: string[];
  setSelectedLocation: (options: string[]) => void;

  selectedReligion: string[];
  setSelectedReligion: (options: string[]) => void;

  selectedCommunity: string[];
  setSelectedCommunity: (options: string[]) => void;

  selectedEducation: string[];
  setSelectedEducation: (options: string[]) => void;

  selectedMoreFilters: SelectedMoreFilters;
  setSelectedMoreFilters: Dispatch<SetStateAction<SelectedMoreFilters>>;
};

export function MatchFilters({
  selectedAge,
  setSelectedAge,

  selectedLocation,
  setSelectedLocation,

  selectedReligion,
  setSelectedReligion,

  selectedCommunity,
  setSelectedCommunity,

  selectedEducation,
  setSelectedEducation,

  selectedMoreFilters,
  setSelectedMoreFilters,
}: MatchFiltersProps) {
  const [search, setSearch] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [sortBy, setSortBy] = useState('best-match');

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isSearchOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isSearchOpen]);

  const handleSearchOpen = () => {
    setIsSearchOpen(true);
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center gap-2 w-full h-11">
        <div className="flex-1 min-w-0 overflow-x-auto hide-scrollbar">
          <div className="flex items-center gap-2 w-max">
            <MultiSelectFilter
              title="Age"
              icon={Calendar}
              options={ageOptions}
              selectedOptions={selectedAge}
              setSelectedOptions={setSelectedAge}
            />

            <MultiSelectFilter
              title="Location"
              icon={MapPin}
              options={locationOptions}
              selectedOptions={selectedLocation}
              setSelectedOptions={setSelectedLocation}
            />

            <MultiSelectFilter
              title="Religion"
              icon={Landmark}
              options={religionOptions}
              selectedOptions={selectedReligion}
              setSelectedOptions={setSelectedReligion}
            />

            <MultiSelectFilter
              title="Community"
              icon={UsersRound}
              options={communityOptions}
              selectedOptions={selectedCommunity}
              setSelectedOptions={setSelectedCommunity}
            />

            <MultiSelectFilter
              title="Education"
              icon={GraduationCap}
              options={educationOptions}
              selectedOptions={selectedEducation}
              setSelectedOptions={setSelectedEducation}
            />

            <MoreFilters
              options={moreFilterOptions}
              selectedFilters={selectedMoreFilters}
              setSelectedFilters={setSelectedMoreFilters}
            />
          </div>
        </div>

        <SortBy value={sortBy} options={sortOptions} onChange={setSortBy} />

        <ProfileSearch
          ref={searchRef}
          value={search}
          onChange={setSearch}
          isOpen={isSearchOpen}
          onOpen={handleSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />
      </div>
    </div>
  );
}
