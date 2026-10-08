import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ChipCarouselProps {
  values: string[];
  className?: string;
}

export function ChipCarousel({ values, className = '' }: ChipCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const element = carouselRef.current;

    if (!element) {
      return;
    }

    const hasOverflow = element.scrollWidth > element.clientWidth;

    setCanScrollLeft(element.scrollLeft > 0);

    setCanScrollRight(
      hasOverflow &&
        element.scrollLeft + element.clientWidth < element.scrollWidth - 1,
    );
  };

  const scroll = (direction: 'left' | 'right') => {
    const element = carouselRef.current;

    if (!element) {
      return;
    }

    element.scrollBy({
      left: direction === 'left' ? -250 : 250,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const element = carouselRef.current;

    if (!element) {
      return;
    }

    // Check initial overflow
    updateScrollState();

    const handleScroll = () => {
      updateScrollState();
    };

    const handleResize = () => {
      updateScrollState();
    };

    element.addEventListener('scroll', handleScroll, { passive: true });

    window.addEventListener('resize', handleResize);

    return () => {
      element.removeEventListener('scroll', handleScroll);

      window.removeEventListener('resize', handleResize);
    };
  }, [values]);

  if (values.length === 0) {
    return (
      <span
        className={`
          font-semibold text-gray-400 text-base
          ${className}
        `}
      >
        -
      </span>
    );
  }

  const hasOverflow = canScrollLeft || canScrollRight;

  return (
    <div
      className={`
        flex items-center gap-2
        min-w-0
        ${className}
      `}
    >
      {/* Left arrow */}
      {hasOverflow && (
        <button
          type="button"
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          aria-label="Scroll left"
          className="
            flex items-center justify-center shrink-0
            w-8 h-8
            bg-white rounded-full border border-gray-200
            text-gray-500
            transition
            hover:bg-pink-50 disabled:opacity-30 hover:border-pink-200 hover:text-pink-500 disabled:cursor-not-allowed
          "
        >
          <ChevronLeft size={18} />
        </button>
      )}

      {/* Chips */}
      <div
        ref={carouselRef}
        className="
          flex flex-1 items-center gap-2
          min-w-0
          overflow-x-auto scrollbar-none
          scroll-smooth
        "
      >
        {values.map((value) => (
          <span
            key={value}
            className="
              shrink-0
              px-3 py-1.5
              bg-pink-50 rounded-md
              font-medium text-pink-600 text-sm
            "
          >
            {value}
          </span>
        ))}
      </div>

      {/* Right arrow */}
      {hasOverflow && (
        <button
          type="button"
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          aria-label="Scroll right"
          className="
            flex items-center justify-center shrink-0
            w-8 h-8
            bg-white rounded-full border border-gray-200
            text-gray-500
            transition
            hover:bg-pink-50 disabled:opacity-30 hover:border-pink-200 hover:text-pink-500 disabled:cursor-not-allowed
          "
        >
          <ChevronRight size={18} />
        </button>
      )}
    </div>
  );
}
