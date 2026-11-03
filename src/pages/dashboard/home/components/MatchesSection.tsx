import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  HeartHandshake,
  RefreshCw,
} from 'lucide-react';
import { initialMatchFilters } from '@/data/initialMatchFilters';
import { getRecommendedMatches } from '@/pages/dashboard/matches/api';
import { ProfileCard } from '@/components';
import type { MatchFiltersState } from '@/types/common.types';
import type { MatchProfile } from '@/types/profile.types';

export function MatchesSection() {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [matches, setMatches] = useState<MatchProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const loadMatches = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await getRecommendedMatches(
        initialMatchFilters as MatchFiltersState,
        'bestMatch',
        '',
        1,
        10,
      );

      setMatches(response.data.matches);
    } catch (error) {
      console.error('Failed to fetch dashboard matches:', error);
      setError('Unable to load recommended matches.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isActive = true;

    const fetchMatches = async () => {
      try {
        const response = await getRecommendedMatches(
          initialMatchFilters as MatchFiltersState,
          'bestMatch',
          '',
          1,
          10,
        );

        if (isActive) {
          setMatches(response.data.matches);
          setError(null);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard matches:', error);

        if (isActive) {
          setError('Unable to load recommended matches.');
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    void fetchMatches();

    return () => {
      isActive = false;
    };
  }, []);

  const updateScrollButtons = useCallback(() => {
    const container = scrollRef.current;

    if (!container) return;

    const firstCard = container.querySelector(
      '.dashboard-match-card',
    ) as HTMLElement | null;

    const lastCard = container.querySelector(
      '.dashboard-match-card:last-child',
    ) as HTMLElement | null;

    if (!firstCard || !lastCard) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const firstCardRect = firstCard.getBoundingClientRect();
    const lastCardRect = lastCard.getBoundingClientRect();

    const tolerance = 3;

    setCanScrollLeft(firstCardRect.left < containerRect.left - tolerance);

    setCanScrollRight(lastCardRect.right > containerRect.right + tolerance);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;

    if (!container || isLoading || error || matches.length === 0) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }

    let animationFrame = 0;

    const scheduleUpdate = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updateScrollButtons);
    };

    scheduleUpdate();

    container.addEventListener('scroll', scheduleUpdate, {
      passive: true,
    });

    const resizeObserver = new ResizeObserver(scheduleUpdate);

    resizeObserver.observe(container);

    if (container.firstElementChild) {
      resizeObserver.observe(container.firstElementChild);
    }

    window.addEventListener('resize', scheduleUpdate);

    return () => {
      cancelAnimationFrame(animationFrame);
      container.removeEventListener('scroll', scheduleUpdate);
      resizeObserver.disconnect();
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [matches, isLoading, error, updateScrollButtons]);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;

    if (!container) return;

    const firstCard = container.querySelector(
      '.dashboard-match-card',
    ) as HTMLElement | null;

    if (!firstCard) return;

    const cardWidth = firstCard.getBoundingClientRect().width;
    const track = firstCard.parentElement;
    const trackStyle = track ? window.getComputedStyle(track) : null;
    const gap = trackStyle ? parseFloat(trackStyle.columnGap) || 0 : 0;

    container.scrollBy({
      left: direction === 'right' ? cardWidth + gap : -(cardWidth + gap),
      behavior: 'smooth',
    });
  };

  const handleShortlistChange = (
    candidateUserId: string,
    isShortlisted: boolean,
  ) => {
    setMatches((previousMatches) =>
      previousMatches.map((match) =>
        match.userId === candidateUserId ? { ...match, isShortlisted } : match,
      ),
    );
  };

  return (
    <section
      className="
        px-5 py-5
        bg-linear-to-l shadow-sm rounded-2xl border border-pink-100
        sm:px-6
        from-pink-50 to-white
      "
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-bold text-slate-900 text-base">
          Recommended Matches
        </h2>

        {matches.length > 0 && (
          <button
            type="button"
            onClick={() => navigate('/matches')}
            className="
              inline-flex items-center gap-1 shrink-0
              font-semibold text-[#e63b66] text-xs
              transition
              hover:underline
            "
          >
            View All
            <ArrowRight size={14} />
          </button>
        )}
      </div>

      {isLoading && (
        <div
          className="flex flex-col items-center justify-center gap-3 min-h-52"
          role="status"
        >
          <div
            className="
              w-8 h-8
              rounded-full border-2 border-pink-200 border-t-[#e91e63]
              animate-spin
            "
          />

          <p className="text-gray-500 text-sm">
            Finding compatible profiles for you...
          </p>
        </div>
      )}

      {!isLoading && error && (
        <div
          className="
            flex flex-col items-center justify-center
            min-h-52 px-4
            text-center
          "
        >
          <p className="text-gray-600 text-sm">{error}</p>

          <button
            type="button"
            onClick={() => void loadMatches()}
            className="
              inline-flex items-center gap-2
              px-4 py-2 mt-4
              rounded-lg border border-gray-200
              font-semibold text-slate-700 text-sm
              transition
              hover:bg-gray-50
            "
          >
            <RefreshCw size={15} />
            Try Again
          </button>
        </div>
      )}

      {!isLoading && !error && matches.length === 0 && (
        <div
          className="
            flex flex-col items-center
            px-4 py-9
            text-center
            sm:py-11
          "
        >
          <div
            className="
              flex items-center justify-center
              w-16 h-16
              bg-pink-50 rounded-full
            "
          >
            <HeartHandshake
              size={34}
              strokeWidth={1.5}
              className="text-[#e63b66]"
            />
          </div>

          <h3 className="mt-4 font-bold text-slate-900 text-lg">
            Your perfect match may be just around the corner!
          </h3>

          <p className="max-w-md mt-2 leading-6 text-gray-500 text-sm">
            We couldn't find compatible profiles right now. New profiles are
            joining VivahBandh, so check back soon.
          </p>

          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="
              inline-flex items-center gap-2
              px-4 py-2.5 mt-4
              rounded-lg
              font-semibold text-[#e63b66] text-sm
              transition
              hover:bg-pink-50
            "
          >
            Review Partner Preferences
            <ArrowRight size={15} />
          </button>
        </div>
      )}

      {!isLoading && !error && matches.length > 0 && (
        <div className="relative mt-2">
          <button
            type="button"
            aria-label="Previous match"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="
              absolute top-1/2 left-0 z-20
              flex items-center justify-center
              w-9 h-9
              bg-white shadow-md rounded-full border border-gray-200
              text-gray-700
              transition
              hover:bg-pink-50 disabled:opacity-40 hover:text-[#e91e63] disabled:cursor-not-allowed
              -translate-x-1/2 -translate-y-1/2
            "
          >
            <ChevronLeft size={21} />
          </button>

          <div
            ref={scrollRef}
            className="
              px-[10%] py-3
              snap-x snap-mandatory
              overflow-x-auto scrollbar-none
              sm:px-2
              scroll-smooth [&::-webkit-scrollbar]:hidden
            "
          >
            <div className="flex gap-4 w-max sm:gap-5">
              {matches.map((match) => (
                <div
                  key={match.userId}
                  className="
                    shrink-0
                    w-[80vw] max-w-80
                    snap-center
                    sm:w-70 md:w-75
                    dashboard-match-card
                  "
                >
                  <ProfileCard
                    match={match}
                    onShortlistChange={handleShortlistChange}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            aria-label="Next match"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="
              absolute top-1/2 right-0 z-20
              flex items-center justify-center
              w-9 h-9
              bg-white shadow-md rounded-full border border-gray-200
              text-gray-700
              transition
              hover:bg-pink-50 disabled:opacity-40 hover:text-[#e91e63] disabled:cursor-not-allowed
              translate-x-1/2 -translate-y-1/2
            "
          >
            <ChevronRight size={21} />
          </button>
        </div>
      )}
    </section>
  );
}
