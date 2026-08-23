import { CircleArrowUp } from 'lucide-react';
import type { CardProp } from '../types';

export function Card({
  title,
  count,
  growth,
  icon: Icon,
  iconBg,
  iconColor,
  growthColor,
}: CardProp) {
  return (
    <div className="p-4 bg-white shadow-sm rounded-xl border border-gray-200">
      <div className="flex items-start gap-2">
        <div
          className={`
            flex items-center justify-center
            p-2
            rounded-full
            ${iconBg}
          `}
        >
          <Icon
            size={24}
            className={`
              ${iconColor}
            `}
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-semibold text-gray-700 text-xs">{title}</p>

          <h4 className="font-bold text-gray-800 text-3xl">{count}</h4>

          <p
            className={`
              flex items-center gap-1
              mt-1
              font-medium text-xs truncate
              ${growthColor}
            `}
          >
            <CircleArrowUp size={14} /> {growth} this week
          </p>
        </div>
      </div>
    </div>
  );
}
