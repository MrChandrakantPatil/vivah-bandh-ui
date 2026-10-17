import { useRef, useState } from 'react';
import type { TouchEvent } from 'react';
import { Bookmark, UserRound, ChevronLeft, ChevronRight } from 'lucide-react';
import { getCdnUrl } from '@/utils/cdn';

interface ProfilePhotoSectionProps {
  photos: string[];
  profileName: string;
  matchPercentage: number;
}

type SlideDirection = 'left' | 'right';

interface SlideState {
  fromIndex: number;
  toIndex: number;
  direction: SlideDirection;
  id: number;
}

export function ProfilePhotoSection({
  photos,
  profileName,
}: ProfilePhotoSectionProps) {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [slide, setSlide] = useState<SlideState | null>(null);
  const [trackReady, setTrackReady] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const animationIdRef = useRef(0);
  const animationTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isAnimatingRef = useRef(false);

  const safeActivePhotoIndex =
    photos.length > 0 ? Math.min(activePhotoIndex, photos.length - 1) : 0;

  const activePhoto = photos[safeActivePhotoIndex];

  const finishAnimation = (id: number) => {
    if (animationIdRef.current !== id) return;

    if (animationTimeout.current) {
      clearTimeout(animationTimeout.current);
      animationTimeout.current = null;
    }

    isAnimatingRef.current = false;
    setIsAnimating(false);
    setSlide(null);
    setTrackReady(false);
  };

  const showPhoto = (
    requestedIndex: number,
    requestedDirection?: SlideDirection,
  ) => {
    if (photos.length <= 1 || isAnimatingRef.current) return;

    const fromIndex = safeActivePhotoIndex;
    const toIndex =
      ((requestedIndex % photos.length) + photos.length) % photos.length;

    if (fromIndex === toIndex) return;

    const direction =
      requestedDirection ?? (toIndex > fromIndex ? 'left' : 'right');

    const id = ++animationIdRef.current;

    if (animationTimeout.current) {
      clearTimeout(animationTimeout.current);
    }

    isAnimatingRef.current = true;
    setIsAnimating(true);
    setTrackReady(false);

    setSlide({
      fromIndex,
      toIndex,
      direction,
      id,
    });

    setActivePhotoIndex(toIndex);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (animationIdRef.current === id) {
          setTrackReady(true);
        }
      });
    });

    animationTimeout.current = setTimeout(() => {
      finishAnimation(id);
    }, 450);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 1) return;

    setTouchStartX(event.touches[0].clientX);
    setTouchStartY(event.touches[0].clientY);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null || touchStartY === null) return;

    const deltaX = event.changedTouches[0].clientX - touchStartX;
    const deltaY = event.changedTouches[0].clientY - touchStartY;

    if (
      Math.abs(deltaX) > 45 &&
      Math.abs(deltaX) > Math.abs(deltaY) &&
      photos.length > 1
    ) {
      if (deltaX < 0) {
        showPhoto(safeActivePhotoIndex + 1, 'left');
      } else {
        showPhoto(safeActivePhotoIndex - 1, 'right');
      }
    }

    setTouchStartX(null);
    setTouchStartY(null);
  };

  return (
    <div className="space-y-3 min-w-0">
      <div
        className="
          relative
          w-full
          bg-pink-200 rounded-xl border border-gray-200
          touch-pan-y
          overflow-hidden
          aspect-4/3
        "
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={() => {
          setTouchStartX(null);
          setTouchStartY(null);
        }}
      >
        {photos.length > 0 ? (
          <div className="absolute inset-0 bg-pink-200 overflow-hidden">
            {slide ? (
              <div
                key={`track-${slide.id}`}
                onTransitionEnd={(event) => {
                  if (event.target !== event.currentTarget) return;
                  if (event.propertyName !== 'transform') return;

                  finishAnimation(slide.id);
                }}
                className="absolute inset-y-0 left-0 flex h-full"
                style={{
                  width: '200%',
                  transform: trackReady
                    ? slide.direction === 'left'
                      ? 'translateX(-50%)'
                      : 'translateX(0)'
                    : slide.direction === 'left'
                      ? 'translateX(0)'
                      : 'translateX(-50%)',
                  transition: trackReady
                    ? 'transform 300ms ease-in-out'
                    : 'none',
                  willChange: 'transform',
                }}
              >
                {slide.direction === 'left' ? (
                  <>
                    <img
                      src={getCdnUrl(photos[slide.fromIndex])}
                      alt=""
                      aria-hidden="true"
                      draggable={false}
                      className="shrink-0 w-1/2 h-full select-none object-cover"
                    />

                    <img
                      src={getCdnUrl(photos[slide.toIndex])}
                      alt={`${profileName}'s profile photo ${slide.toIndex + 1}`}
                      draggable={false}
                      className="shrink-0 w-1/2 h-full select-none object-cover"
                    />
                  </>
                ) : (
                  <>
                    <img
                      src={getCdnUrl(photos[slide.toIndex])}
                      alt={`${profileName}'s profile photo ${slide.toIndex + 1}`}
                      draggable={false}
                      className="shrink-0 w-1/2 h-full select-none object-cover"
                    />

                    <img
                      src={getCdnUrl(photos[slide.fromIndex])}
                      alt=""
                      aria-hidden="true"
                      draggable={false}
                      className="shrink-0 w-1/2 h-full select-none object-cover"
                    />
                  </>
                )}
              </div>
            ) : (
              <img
                key={`photo-${activePhoto}`}
                src={getCdnUrl(activePhoto)}
                alt={`${profileName}'s profile photo ${safeActivePhotoIndex + 1}`}
                draggable={false}
                className="absolute inset-0 w-full h-full select-none object-cover"
              />
            )}
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-pink-200">
            <UserRound size={64} strokeWidth={1.2} className="text-slate-400" />
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsShortlisted((previous) => !previous)}
          aria-label={
            isShortlisted ? 'Remove from shortlist' : 'Add to shortlist'
          }
          aria-pressed={isShortlisted}
          className="
            absolute top-3 right-3 z-30
            flex items-center justify-center
            w-10 h-10
            bg-white/90 shadow-sm rounded-full border border-white/60
            text-slate-600
            hover:bg-white
            backdrop-blur-sm
          "
        >
          <Bookmark
            size={19}
            fill={isShortlisted ? 'currentColor' : 'none'}
            className={isShortlisted ? 'text-[#e91e63]' : 'text-slate-600'}
          />
        </button>

        {photos.length > 0 && (
          <span
            className="
              absolute right-3 bottom-3 z-30
              px-2.5 py-1
              bg-black/55 rounded-full
              font-medium text-white text-xs
            "
          >
            {safeActivePhotoIndex + 1} / {photos.length}
          </span>
        )}
      </div>

      {photos.length > 1 && (
        <div className="flex items-center justify-center gap-5 w-full">
          <button
            type="button"
            onClick={() => showPhoto(safeActivePhotoIndex - 1, 'right')}
            aria-label="Previous profile photo"
            disabled={isAnimating}
            className="
              items-center justify-center shrink-0
              w-7 h-7
              bg-white rounded-md border border-slate-200
              text-slate-600
              transition
              hover:bg-pink-50 disabled:opacity-50 hover:border-pink-200 hover:text-[#e91e63] disabled:cursor-not-allowed
              sm:flex
              hidden
            "
          >
            <ChevronLeft size={18} />
          </button>

          <div
            className="
              flex items-center justify-center gap-2
              max-w-[calc(100%-4rem)] min-w-0 py-2
              overflow-x-auto scrollbar-none
              sm:max-w-[70%]
              [&::-webkit-scrollbar]:hidden
            "
            aria-label="Profile photo navigation"
          >
            {photos.map((photo, index) => {
              const isActive = safeActivePhotoIndex === index;

              return (
                <button
                  key={`${photo}-${index}`}
                  type="button"
                  onClick={() => showPhoto(index)}
                  aria-label={`Show profile photo ${index + 1}`}
                  aria-pressed={isActive}
                  className={`
                    shrink-0
                    h-2.5
                    rounded-full
                    transition-all duration-200
                    ${
                      isActive
                        ? 'w-6 bg-[#e91e63]'
                        : 'w-2.5 bg-slate-300 hover:bg-pink-300'
                    }
                  `}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => showPhoto(safeActivePhotoIndex + 1, 'left')}
            aria-label="Next profile photo"
            disabled={isAnimating}
            className="
              items-center justify-center shrink-0
              w-7 h-7
              bg-white rounded-md border border-slate-200
              text-slate-600
              transition
              hover:bg-pink-50 disabled:opacity-50 hover:border-pink-200 hover:text-[#e91e63] disabled:cursor-not-allowed
              sm:flex
              hidden
            "
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
