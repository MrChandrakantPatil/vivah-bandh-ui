import type { NotificationBadgeProp } from '../types';

export function NotificationBadge({
  count,
  className = '',
}: NotificationBadgeProp) {
  if (!count) return null;

  return (
    <div
      className={`
        flex items-center justify-center
        min-w-4 h-4
        bg-[#e21c56] rounded-full
        font-semibold text-[8px] text-white
        sm:min-w-4.5 md:min-w-5 lg:min-w-5.5 sm:h-4.5 md:h-5 lg:h-5.5 sm:text-[10px] md:text-[11px] md:text-sm
        ${className}
      `}
    >
      {count}
    </div>
  );
}
