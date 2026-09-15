import { useState } from 'react';
import { shortlistProfile, unshortlistProfile } from '../api';

import {
  BadgeCheck,
  Bookmark,
  Heart,
  MapPin,
  Mosque,
  Scaling,
  BriefcaseBusiness,
} from 'lucide-react';

import {
  male1,
  male2,
  male3,
  male4,
  male5,
  female1,
  female2,
  female3,
  female4,
  female5,
} from '@/assets/images';

interface MatchProfile {
  userId: string;
  name: string;
  matchPercentage: number;
  age: number;
  occupation: string;
  location: {
    city: string | null;
    state: string | null;
    country: string | null;
  };
  height: number;
  religion: string;
  maritalStatus: string;
  profilePhotos: string[];
  isShortlisted: boolean;
}

interface MatchCardProps {
  match: MatchProfile;

  onShortlistChange: (candidateUserId: string, isShortlisted: boolean) => void;
}

export function MatchCard({ match, onShortlistChange }: MatchCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const profileImages = {
    male1,
    male2,
    male3,
    male4,
    male5,
    female1,
    female2,
    female3,
    female4,
    female5,
  };

  const image =
    profileImages[match.profilePhotos[1] as keyof typeof profileImages];

  const location = [match.location.city, match.location.state]
    .filter(Boolean)
    .join(', ');

  const handleShortlist = async () => {
    if (isUpdating) return;

    const isShortlisted = match.isShortlisted;

    onShortlistChange(match.userId, !isShortlisted);

    setIsUpdating(true);

    try {
      if (!isShortlisted) {
        await shortlistProfile(match.userId);
      } else {
        await unshortlistProfile(match.userId);
      }
    } catch (error) {
      console.error('Failed to update shortlist', error);

      onShortlistChange(match.userId, isShortlisted);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl transition overflow-hidden hover:shadow-xl">
      <div className="relative bg-gray-100 overflow-hidden aspect-video">
        <img
          src={image}
          alt={match.name}
          className="w-full h-full transition-transform duration-300 hover:scale-105 object-cover"
        />

        <div
          className="
            absolute top-2.5 left-2.5
            px-3 py-2
            bg-white rounded-lg
            font-bold text-[#ea0a55] text-center
          "
        >
          <div className="flex items-center text-sm">
            <Heart className="w-4 h-4 mr-1 fill-[#ea0a55]" />
            {match.matchPercentage}%
          </div>

          <span className="text-md">Match</span>
        </div>

        <button
          type="button"
          onClick={handleShortlist}
          disabled={isUpdating}
          aria-label={`Bookmark ${match.name}`}
          className="
            absolute top-3 right-3
            flex items-center justify-center
            w-9 h-9
            bg-white/90 shadow-sm rounded-full
            hover:bg-white
          "
        >
          <Bookmark
            size={18}
            className={
              match.isShortlisted
                ? 'text-red-500 fill-red-500'
                : 'text-gray-700'
            }
          />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-gray-800 text-lg truncate">
            {match.name}, {match.age}
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
          <BriefcaseBusiness size={15} className="shrink-0 text-gray-500" />

          <span className="truncate">{match.occupation}</span>
        </div>

        <div className="flex items-center gap-1.5 mt-2 text-gray-600 text-sm">
          <MapPin size={16} className="shrink-0 text-gray-500" />

          <span className="truncate">{location}</span>
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
            {match.height} cm
          </span>

          <span className="flex items-center gap-1.5">
            <Mosque size={15} className="text-gray-500" />

            {match.religion}
          </span>

          <span className="flex items-center gap-1.5">
            <Heart size={15} className="text-gray-500" />

            {match.maritalStatus}
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
  );
}
