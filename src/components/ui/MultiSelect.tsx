import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import type { SelectOption } from '@/data/types';

interface MultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  options?: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function MultiSelect({
  value,
  onChange,
  options = [],
  placeholder = 'Select options',
  disabled = false,
  className = '',
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option: SelectOption) => {
    const isSelected = value.includes(option.value);

    if (isSelected) {
      onChange(value.filter((selectedValue) => selectedValue !== option.value));
    } else {
      onChange([...value, option.value]);
    }
  };

  const selectedLabels = options
    .filter((option) => value.includes(option.value))
    .map((option) => option.label);

  return (
    <div
      ref={selectRef}
      className={`
        relative
        mt-3
        ${className}
      `}
    >
      {/* Selected Values */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`
          flex items-center justify-between
          w-full px-3 py-2.5
          bg-white rounded-lg border
          font-medium text-base text-left
          transition
          outline-none
          ${isOpen ? 'border-pink-400 ring-2 ring-pink-100' : 'border-gray-200'}
          ${
            disabled
              ? 'cursor-not-allowed bg-gray-50 text-gray-400'
              : 'cursor-pointer text-[#172554] hover:border-gray-300'
          }
        `}
      >
        {/* Horizontal Chip Container */}
        <div
          className="
            flex flex-1 items-center gap-2
            min-w-0
            overflow-x-auto scrollbar-none
          "
        >
          {selectedLabels.length > 0 ? (
            selectedLabels.map((label) => (
              <span
                key={label}
                className="
                  shrink-0
                  px-2.5 py-1
                  bg-pink-50 rounded-md
                  font-medium text-pink-600 text-xs
                "
              >
                {label}
              </span>
            ))
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </div>

        {/* Dropdown Icon */}
        <ChevronDown
          size={18}
          className={`
            shrink-0
            ml-2
            text-gray-400
            transition-transform duration-200
            ${isOpen ? 'rotate-180' : ''}
          `}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="
            absolute top-full right-0 left-0 z-50
            p-1 mt-2
            bg-white shadow-[0_8px_24px_rgba(15,23,42,0.12)] rounded-xl border border-gray-100
            overflow-hidden
          "
        >
          <div className="max-h-60 overflow-y-auto">
            {options.length === 0 ? (
              <div className="px-3 py-2.5 text-gray-400 text-sm">
                No options available
              </div>
            ) : (
              options.map((option) => {
                const isSelected = value.includes(option.value);

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`
                      flex items-center justify-between
                      w-full px-3 py-2.5
                      rounded-lg
                      text-sm text-left
                      transition
                      ${
                        isSelected
                          ? 'bg-pink-50 font-medium text-pink-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    <span>{option.label}</span>

                    {isSelected && (
                      <Check size={16} className="shrink-0 text-pink-500" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
