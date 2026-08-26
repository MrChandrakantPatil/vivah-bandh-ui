import { useState } from 'react';
import { Eye, EyeOff, type LucideIcon } from 'lucide-react';
import type { RefObject } from 'react';

export type FormInputProps = {
  id: string;
  label: string;
  value: string;
  error?: string;
  icon: LucideIcon;
  ref?: RefObject<HTMLInputElement | null>;
  type?: string;

  // Optional placeholder
  placeholder?: string;

  // false = Placeholder → Floating label
  // true = Label always stays at top
  alwaysFloatingLabel?: boolean;

  // Show / hide error message
  showError?: boolean;

  // Enable password visibility toggle
  isPassword?: boolean;

  onChange: (value: string) => void;
  onBlur?: (value: string) => void;

  className?: string;
};

export function FormInput({
  id,
  label,
  value,
  error,
  icon: Icon,
  ref,
  type = 'text',
  placeholder = ' ',
  alwaysFloatingLabel = false,
  showError = true,
  isPassword = false,
  onChange,
  onBlur,
  className,
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

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

        <input
          ref={ref}
          id={id}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={(e) => onBlur?.(e.target.value)}
          className={`
            w-full py-3 pl-10
            bg-transparent rounded-lg border
            text-white
            transition-all duration-200
            caret-white outline-none peer
            ${isPassword ? 'pr-12' : 'pr-4'}
            ${
              error
                ? `border-[#FF8A00] placeholder:text-white/50 focus:border-[#FF8A00]`
                : `border-white/30 placeholder:text-white/50 focus:border-white/70`
            }
          `}
        />

        {isPassword && (
          <button
            type="button"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            onClick={() => setShowPassword((prev) => !prev)}
            className={`
              absolute top-1/2 right-3
              text-white/70
              transition-colors duration-200
              cursor-pointer
              -translate-y-1/2
            `}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}

        {alwaysFloatingLabel ? (
          <label
            htmlFor={id}
            className={`
              absolute left-3 -top-2
              px-1
              bg-[#C60D50]
              text-xs
              transition-all duration-200
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
        ) : (
          <label
            htmlFor={id}
            className={`
              absolute top-3 left-10 peer-not-placeholder-shown:left-3 peer-not-placeholder-shown:-top-2
              peer-not-placeholder-shown:px-1
              peer-not-placeholder-shown:bg-[#C60D50]
              peer-not-placeholder-shown:text-xs text-white/50
              transition-all duration-200
              pointer-events-none
              peer-focus:left-3 peer-focus:px-1 peer-focus:bg-[#C60D50] peer-focus:text-xs peer-focus:-top-2
              ${
                error
                  ? `peer-focus
                : text-[#FF8A00]`
                  : `peer-focus:text-white/80`
              }
            `}
          >
            {label}
          </label>
        )}
      </div>

      {showError && error && (
        <p className="z-20 mt-1 whitespace-nowrap text-[#FF8A00] text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
