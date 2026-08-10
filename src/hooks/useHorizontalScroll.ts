import { useEffect, useRef, useState } from 'react';

export function useHorizontalScroll(itemSelector: string, totalItems: number) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [activeItem, setActiveItem] = useState(0);

  const checkScroll = () => {
    const container = scrollRef.current;

    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    const threshold = 5;

    const hasOverflow = scrollWidth > clientWidth + threshold;

    setCanScrollLeft(hasOverflow && scrollLeft > threshold);

    setCanScrollRight(
      hasOverflow && scrollLeft + clientWidth < scrollWidth - threshold,
    );
  };

  const scrollToItem = (index: number) => {
    const container = scrollRef.current;

    if (!container) return;

    const items = container.querySelectorAll<HTMLElement>(itemSelector);

    const item = items[index];

    if (!item) return;

    const targetPosition =
      item.offsetLeft - container.clientWidth / 2 + item.offsetWidth / 2;

    container.scrollTo({
      left: targetPosition,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    const nextIndex = Math.min(activeItem + 1, totalItems - 1);

    setActiveItem(nextIndex);
    scrollToItem(nextIndex);
  };

  const scrollLeft = () => {
    const previousIndex = Math.max(activeItem - 1, 0);

    setActiveItem(previousIndex);
    scrollToItem(previousIndex);
  };

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    checkScroll();

    const resizeObserver = new ResizeObserver(() => {
      checkScroll();
    });

    resizeObserver.observe(container);

    container.addEventListener('scroll', checkScroll);

    return () => {
      resizeObserver.disconnect();

      container.removeEventListener('scroll', checkScroll);
    };
  }, []);

  return {
    scrollRef,
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight,
  };
}
