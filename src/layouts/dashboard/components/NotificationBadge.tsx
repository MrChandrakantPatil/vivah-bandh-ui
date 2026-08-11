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
        min-w-4 h-4 text-[8px]
        sm:min-w-4.5 sm:h-4.5 sm:text-[10px]
        md:min-w-5 md:h-5 md:text-[11px]
        lg:min-w-5.5 lg:h-5.5 md:text-sm
        bg-[#e21c56] rounded-full font-semibold text-white
        ${className}
      `}
    >
      {count}
    </div>
  );
}
