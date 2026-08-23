import { useState } from 'react';
import { MatchFilters } from './MatchFilters/MatchFilters';
import type { SelectedMoreFilters } from '@/components/Filters/types';
import { users } from '../data';
import {
  BadgeCheck,
  Bookmark,
  Heart,
  MapPin,
  Mosque,
  Scaling,
  BriefcaseBusiness,
} from 'lucide-react';

export function RecommendedMatches() {
  const [selectedAge, setSelectedAge] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
  const [selectedReligion, setSelectedReligion] = useState<string[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState<string[]>([]);
  const [selectedEducation, setSelectedEducation] = useState<string[]>([]);
  const [selectedMoreFilters, setSelectedMoreFilters] =
    useState<SelectedMoreFilters>({});

  console.log(selectedMoreFilters);

  return (
    <div className="w-full">
      <MatchFilters
        selectedAge={selectedAge}
        setSelectedAge={setSelectedAge}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        selectedReligion={selectedReligion}
        setSelectedReligion={setSelectedReligion}
        selectedCommunity={selectedCommunity}
        setSelectedCommunity={setSelectedCommunity}
        selectedEducation={selectedEducation}
        setSelectedEducation={setSelectedEducation}
        selectedMoreFilters={selectedMoreFilters}
        setSelectedMoreFilters={setSelectedMoreFilters}
      />

      <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow-md rounded-xl transition overflow-hidden hover:shadow-xl"
          >
            <div className="relative bg-gray-100 overflow-hidden aspect-[16/9]">
              <img
                src={user.image}
                alt={user.name}
                className="w-full h-full transition-transform duration-300 hover:scale-105 object-cover"
              />

              <button
                type="button"
                aria-label={`Bookmark ${user.name}`}
                className="
                  absolute top-3 right-3
                  flex items-center justify-center
                  w-9 h-9
                  bg-white/90 shadow-sm rounded-full
                  hover:bg-white
                "
              >
                <Bookmark size={18} className="text-gray-700" />
              </button>
            </div>

            <div className="p-4">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-gray-800 text-lg truncate">
                  {user.name}, {user.age}
                </h3>

                <BadgeCheck
                  size={19}
                  fill="#ea0a55"
                  className="shrink-0 text-white"
                />
              </div>

              <div
                className="
                  flex items-center gap-1.5
                  mt-1
                  font-medium text-gray-600 text-sm
                "
              >
                <BriefcaseBusiness
                  size={15}
                  className="shrink-0 text-gray-500"
                />

                <span className="truncate">{user.occupation}</span>
              </div>

              <div className="flex items-center gap-1.5 mt-2 text-gray-600 text-sm">
                <MapPin size={16} className="shrink-0 text-gray-500" />

                <span className="truncate">{user.location}</span>
              </div>

              <div
                className="
                  flex flex-wrap gap-x-4 gap-y-2
                  mt-3
                  text-gray-600 text-sm
                "
              >
                <span className="flex items-center gap-1.5">
                  <Scaling size={15} className="text-gray-500" />

                  {user.height}
                </span>

                <span className="flex items-center gap-1.5">
                  <Mosque size={15} className="text-gray-500" />

                  {user.religion}
                </span>

                <span className="flex items-center gap-1.5">
                  <Heart size={15} className="text-gray-500" />

                  {user.maritalStatus}
                </span>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  className="
                    flex flex-1 items-center justify-center gap-2
                    px-3 py-2
                    rounded-md border border-[#ea0a55]
                    font-semibold text-[#ea0a55] text-sm
                    transition
                    hover:bg-gray-50
                  "
                >
                  <Heart size={17} />
                  Interested
                </button>

                <button
                  type="button"
                  className="
                    flex-1
                    px-3 py-2
                    bg-[#ea0a55] rounded-md
                    font-semibold text-white text-sm
                    transition
                    hover:bg-[#ed487f]
                  "
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
