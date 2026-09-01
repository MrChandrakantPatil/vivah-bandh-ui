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
  placeholder?: string;

  // Enable floating label
  floatingLabel?: boolean;

  // Keep floating label always visible
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
  floatingLabel = false,
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
    <div
      className={`
        relative
        ${className ?? ''}
      `}
    >
      {!floatingLabel && (
        <label
          htmlFor={id}
          className="block mb-2 font-semibold text-white text-md"
        >
          {label}
        </label>
      )}

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
          className="shrink-0 text-white/80 pointer-events-none"
        />

        <input
          ref={ref}
          id={id}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={(e) => onBlur?.(e.target.value)}
          className="
            flex-1
            min-w-0 px-3 py-3
            bg-transparent shadow-none! border-0!
            text-white placeholder:text-white/50
            focus:shadow-none! active:shadow-none! focus:border-0! active:border-0! disabled:cursor-not-allowed focus:outline-none! focus:ring-0! active:outline-none! active:ring-0!
            peer caret-white outline-none! ring-0!
          "
        />

        {isPassword && (
          <button
            type="button"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            onClick={() => setShowPassword((prev) => !prev)}
            className="shrink-0 text-white/80 transition-colors duration-200 cursor-pointer hover:text-white/80"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}

        {floatingLabel && (
          <>
            {alwaysFloatingLabel ? (
              <label
                htmlFor={id}
                className={`
                  absolute left-3 -top-2
                  px-1
                  bg-[#C60D50]
                  text-xs text-white/50
                  transition-all duration-200
                  pointer-events-none
                  ${error ? 'text-[#FF8A00]' : 'peer-focus:text-white/80'}
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
                      ? 'peer-focus:text-[#FF8A00]'
                      : 'peer-focus:text-white/80'
                  }
                `}
              >
                {label}
              </label>
            )}
          </>
        )}
      </div>

      {showError && error && (
        <p className="mt-1 whitespace-nowrap text-[#FF8A00] text-sm">{error}</p>
      )}
    </div>
  );
}
