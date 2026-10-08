import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import type { SelectOption } from '@/data/types';

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options?: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function Select({
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  disabled = false,
  className = '',
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

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
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div
      ref={selectRef}
      className={`
        relative
        mt-3
        ${className}
      `}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`
          flex items-center justify-between
          w-full px-3 py-2.5
          bg-white rounded-lg border
          font-medium text-sm text-left
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
        <span
          className={`
            flex-1
            min-w-0
            truncate
            ${!selectedOption ? 'text-gray-400' : ''}
          `}
        >
          {selectedOption?.label || placeholder}
        </span>

        <ChevronDown
          size={18}
          className={`
            shrink-0
            text-gray-400
            transition-transform duration-200
            ${isOpen ? 'rotate-180' : ''}
          `}
        />
      </button>

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
                const isSelected = option.value === value;

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
