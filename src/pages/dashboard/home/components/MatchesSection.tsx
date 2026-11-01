import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, HeartHandshake, RefreshCw, } from 'lucide-react';
import { initialMatchFilters } from '@/data/initialMatchFilters';
import { getRecommendedMatches } from '@/pages/dashboard/matches/api';
import { MatchCard } from '@/pages/dashboard/matches/components/MatchCard';
import type { MatchFiltersState } from "@/types/common.types";
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

    setCanScrollLeft(
      firstCardRect.left < containerRect.left - tolerance,
    );

    setCanScrollRight(
      lastCardRect.right > containerRect.right + tolerance,
    );
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
    const gap = trackStyle
      ? parseFloat(trackStyle.columnGap) || 0
      : 0;

    container.scrollBy({
      left:
        direction === 'right'
          ? cardWidth + gap
          : -(cardWidth + gap),
      behavior: 'smooth',
    });
  };

  const handleShortlistChange = (
    candidateUserId: string,
    isShortlisted: boolean,
  ) => {
    setMatches((previousMatches) =>
      previousMatches.map((match) =>
        match.userId === candidateUserId
          ? { ...match, isShortlisted }
          : match,
      ),
    );
  };

  return (
    <section
      className="
        rounded-2xl border border-pink-100
        bg-linear-to-l from-pink-50 to-white
        px-5 py-5 shadow-sm
        sm:px-6
      "
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-bold text-slate-900">
          Recommended Matches
        </h2>

        {matches.length > 0 && (
          <button
            type="button"
            onClick={() => navigate('/matches')}
            className="
              inline-flex shrink-0 items-center gap-1
              text-xs font-semibold text-[#e63b66]
              transition hover:underline
            "
          >
            View All
            <ArrowRight size={14} />
          </button>
        )}
      </div>

      {isLoading && (
        <div
          className="flex min-h-52 flex-col items-center justify-center gap-3"
          role="status"
        >
          <div
            className="
              h-8 w-8 animate-spin rounded-full
              border-2 border-pink-200 border-t-[#e91e63]
            "
          />

          <p className="text-sm text-gray-500">
            Finding compatible profiles for you...
          </p>
        </div>
      )}

      {!isLoading && error && (
        <div className="flex min-h-52 flex-col items-center justify-center px-4 text-center">
          <p className="text-sm text-gray-600">{error}</p>

          <button
            type="button"
            onClick={() => void loadMatches()}
            className="
              mt-4 inline-flex items-center gap-2
              rounded-lg border border-gray-200 px-4 py-2
              text-sm font-semibold text-slate-700
              transition hover:bg-gray-50
            "
          >
            <RefreshCw size={15} />
            Try Again
          </button>
        </div>
      )}

      {!isLoading && !error && matches.length === 0 && (
        <div className="flex flex-col items-center px-4 py-9 text-center sm:py-11">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-50">
            <HeartHandshake
              size={34}
              strokeWidth={1.5}
              className="text-[#e63b66]"
            />
          </div>

          <h3 className="mt-4 text-lg font-bold text-slate-900">
            Your perfect match may be just around the corner!
          </h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
            We couldn't find compatible profiles right now. New profiles
            are joining VivahBandh, so check back soon.
          </p>

          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="
              mt-4 inline-flex items-center gap-2
              rounded-lg px-4 py-2.5
              text-sm font-semibold text-[#e63b66]
              transition hover:bg-pink-50
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
              absolute left-0 top-1/2 z-20
              flex h-9 w-9 -translate-x-1/2 -translate-y-1/2
              items-center justify-center
              rounded-full border border-gray-200
              bg-white text-gray-700 shadow-md
              transition hover:bg-pink-50 hover:text-[#e91e63]
              disabled:cursor-not-allowed disabled:opacity-40
            "
          >
            <ChevronLeft size={21} />
          </button>

          <div
            ref={scrollRef}
            className="
              overflow-x-auto snap-x snap-mandatory
              px-[10%] py-3
              sm:px-2
              scroll-smooth
              scrollbar-none
              [&::-webkit-scrollbar]:hidden
            "
          >
            <div className="flex w-max gap-4 sm:gap-5">
              {matches.map((match) => (
                <div
                  key={match.userId}
                  className="
                    dashboard-match-card
                    w-[80vw] max-w-80 shrink-0
                    snap-center
                    sm:w-70 md:w-75
                  "
                >
                  <MatchCard
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
              absolute right-0 top-1/2 z-20
              flex h-9 w-9 translate-x-1/2 -translate-y-1/2
              items-center justify-center
              rounded-full border border-gray-200
              bg-white text-gray-700 shadow-md
              transition hover:bg-pink-50 hover:text-[#e91e63]
              disabled:cursor-not-allowed disabled:opacity-40
            "
          >
            <ChevronRight size={21} />
          </button>
        </div>
      )}
    </section>
  );
}