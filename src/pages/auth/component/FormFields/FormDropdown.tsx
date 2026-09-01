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
  return (
    <div
      className={`
        relative
        ${className}
      `}
    >
      <div
        className={`
          relative
          flex items-center
          w-full px-3
          bg-transparent rounded-lg border
          transition-all duration-200
          ${
            error
              ? 'border-[#FF8A00] focus-within:border-[#FF8A00]'
              : 'border-white/30 focus-within:border-white/80'
          }
        `}
      >
        <Icon
          size={18}
          strokeWidth={2}
          className="text-white/70 pointer-events-none"
        />

        <select
          ref={ref}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={(e) => onBlur?.(e.target.value)}
          className={`
            flex-1
            min-w-0 px-3 py-3
            bg-transparent rounded-lg
            text-white
            transition-all duration-200
            cursor-pointer appearance-none
            outline-none peer
            ${!value ? 'text-white/50' : 'text-white'}
          `}
        >
          <option value="" disabled className="text-white/70">
            Select {label}
          </option>

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-white/70"
            >
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={20}
          strokeWidth={2}
          className="text-white/70 pointer-events-none"
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
        <p className="mt-1 whitespace-nowrap text-[#FF8A00] text-sm">{error}</p>
      )}
    </div>
  );
}
