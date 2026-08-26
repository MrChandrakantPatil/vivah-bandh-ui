import { ChevronDown, type LucideIcon } from 'lucide-react';
import type { RefObject } from 'react';

export type DropdownOption = {
  value: string;
  label: string;
};

export type FormDropdownProps = {
  id: string;
  label: string;
  value: string;
  options: DropdownOption[];
  icon: LucideIcon;
  error?: string;
  ref?: RefObject<HTMLSelectElement | null>;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
  className?: string;
};

export function FormDropdown({
  id,
  label,
  value,
  options,
  icon: Icon,
  error,
  ref,
  onChange,
  onBlur,
  className,
}: FormDropdownProps) {
  console.log(error);

  return (
    <div className={className}>
      <div className="relative">
        <Icon
          size={18}
          strokeWidth={2}
          className="
            absolute top-1/2 left-3 z-10
            text-white/80
            pointer-events-none
            -translate-y-1/2
          "
        />

        <select
          ref={ref}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={(e) => onBlur?.(e.target.value)}
          className={`
            w-full px-4 py-3 pr-10 pl-10
            bg-transparent rounded-lg border
            text-white
            transition-all duration-200
            cursor-pointer appearance-none
            outline-none peer
            ${
              error
                ? 'border-[#FF8A00]'
                : 'border-white/30 focus:border-white/70'
            }
            ${!value ? 'text-white/50' : 'text-white'}
          `}
        >
          <option value="" disabled className="bg-[#C60D50] text-white/70">
            Select {label}
          </option>

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-[#C60D50] text-white/80"
            >
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={20}
          strokeWidth={1.8}
          className="absolute top-1/2 right-3 text-white/70 pointer-events-none -translate-y-1/2"
        />

        <label
          htmlFor={id}
          className={`
            absolute left-3 -top-2
            px-1
            bg-[#C60D50]
            text-xs
            pointer-events-none
            ${
              error
                ? `text-[#FF8A00] peer-focus:text-[#FF8A00]`
                : `text-white/50 peer-focus:text-white/80`
            }
          `}
        >
          {label}
        </label>
      </div>

      {error && (
        <p className="z-20 mt-1 whitespace-nowrap text-[#FF8A00] text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
