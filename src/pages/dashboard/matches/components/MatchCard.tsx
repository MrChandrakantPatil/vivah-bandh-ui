import { useState } from 'react';
import { shortlistProfile, unshortlistProfile } from '../api';
import { getCdnUrl } from '@/utils/cdn';
import type { MatchProfile } from '../types';
import {
  BadgeCheck,
  Bookmark,
  Heart,
  MapPin,
  Mosque,
  Scaling,
  BriefcaseBusiness,
} from 'lucide-react';

interface MatchCardProps {
  match: MatchProfile;
  onShortlistChange: (candidateUserId: string, isShortlisted: boolean) => void;
}

export function MatchCard({ match, onShortlistChange }: MatchCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [imageError, setImageError] = useState(false);

  const imageKey = match.profilePhotos?.[0];
  const image = imageKey ? getCdnUrl(imageKey) : '';

  // Get the first character of the first name and surname.
  const initials =
    match.name
      ?.trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('') || '?';

  const location = [match.location.city, match.location.state]
    .filter(Boolean)
    .join(', ');

  const handleShortlist = async () => {
    if (isUpdating) return;

    const wasShortlisted = match.isShortlisted;

    // Optimistically update the UI.
    onShortlistChange(match.userId, !wasShortlisted);
    setIsUpdating(true);

    try {
      if (!wasShortlisted) {
        await shortlistProfile(match.userId);
      } else {
        await unshortlistProfile(match.userId);
      }
    } catch (error) {
      console.error('Failed to update shortlist:', error);

      // Restore the previous state if the API request fails.
      onShortlistChange(match.userId, wasShortlisted);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl transition overflow-hidden hover:shadow-xl">
      <div className="relative bg-gray-100 overflow-hidden aspect-video">
        {image && !imageError ? (
          <img
            src={image}
            alt={`${match.name}'s profile`}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full transition-transform duration-300 hover:scale-105 object-cover"
          />
        ) : (
          <div
            className="
              flex items-center justify-center
              w-full h-full
              bg-pink-50
              font-semibold text-[#ea0a55] text-5xl
            "
            role="img"
            aria-label={`${match.name}'s profile initials: ${initials}`}
          >
            {initials}
          </div>
        )}

        {/* Match percentage */}
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

        {/* Shortlist button */}
        <button
          type="button"
          onClick={handleShortlist}
          disabled={isUpdating}
          aria-label={
            match.isShortlisted
              ? `Remove ${match.name} from shortlist`
              : `Add ${match.name} to shortlist`
          }
          aria-pressed={match.isShortlisted}
          className="
            absolute top-3 right-3
            flex items-center justify-center
            w-9 h-9
            bg-white/90 shadow-sm rounded-full
            transition
            hover:bg-white disabled:opacity-60 disabled:cursor-not-allowed
          "
        >
          <Bookmark
            size={18}
            className={
              match.isShortlisted
                ? 'fill-red-500 text-red-500'
                : 'text-gray-700'
            }
          />
        </button>
      </div>

      {/* Profile details */}
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

        {/* Occupation */}
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

        {/* Location */}
        <div className="flex items-center gap-1.5 mt-2 text-gray-600 text-sm">
          <MapPin size={16} className="shrink-0 text-gray-500" />

          <span className="truncate">
            {location || match.location.country || 'Location not specified'}
          </span>
        </div>

        {/* Additional details */}
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

        {/* Actions */}
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
