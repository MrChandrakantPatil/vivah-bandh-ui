import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Search, X } from 'lucide-react';
import type { SelectOptionType } from '@/types/common.types';

interface SelectOptionProps {
  value: string;
  onChange: (value: string) => void;
  options?: SelectOptionType[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function SelectOption({
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  disabled = false,
  className = '',
}: SelectOptionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const selectRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchSectionRef = useRef<HTMLDivElement>(null);
  const optionsListRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  const showSearch = options.length > 10;

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.trim().toLowerCase()),
  );

  useLayoutEffect(() => {
    if (!isOpen) return;

    const updatePlacement = () => {
      const trigger = triggerRef.current;
      const menu = menuRef.current;
      const optionsList = optionsListRef.current;
      const searchSection = searchSectionRef.current;

      if (!trigger || !menu || !optionsList) return;

      const gap = 8;

      optionsList.style.maxHeight = '';

      const triggerRect = trigger.getBoundingClientRect();
      const menuHeight = menu.getBoundingClientRect().height;

      const spaceBelow = window.innerHeight - triggerRect.bottom - gap;

      const spaceAbove = triggerRect.top - gap;

      const openUpward = spaceBelow < menuHeight && spaceAbove > spaceBelow;

      const availableSpace = Math.max(0, openUpward ? spaceAbove : spaceBelow);

      menu.style.top = openUpward ? 'auto' : `calc(100% + ${gap}px)`;

      menu.style.bottom = openUpward ? `calc(100% + ${gap}px)` : 'auto';

      const searchHeight = searchSection?.getBoundingClientRect().height ?? 0;

      const availableOptionsHeight = Math.max(
        0,
        availableSpace - searchHeight - 2,
      );

      optionsList.style.maxHeight = `${Math.min(
        240,
        availableOptionsHeight,
      )}px`;
    };

    updatePlacement();

    window.addEventListener('resize', updatePlacement);
    window.addEventListener('scroll', updatePlacement, true);

    return () => {
      window.removeEventListener('resize', updatePlacement);
      window.removeEventListener('scroll', updatePlacement, true);
    };
  }, [isOpen, search, options, showSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearch('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    if (disabled) return;

    if (isOpen) {
      setIsOpen(false);
      setSearch('');
    } else {
      setIsOpen(true);
    }
  };

  const handleSelect = (option: SelectOptionType) => {
    onChange(option.value);
    setIsOpen(false);
    setSearch('');
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearchKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
      setSearch('');
    }
  };

  const handleClearSearch = () => {
    setSearch('');
  };

  return (
    <div
      ref={selectRef}
      className={`
        relative
        mt-2
        ${className}
      `}
    >
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={handleToggle}
        aria-expanded={isOpen}
        className={`
          flex items-center justify-between
          w-full px-3 py-2
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
          ref={menuRef}
          className="
            absolute left-1/2 z-50
            w-fit max-w-[90vw] min-w-full
            bg-white shadow-[0_8px_24px_rgba(15,23,42,0.10)] rounded-xl border border-slate-200
            overflow-hidden
            -translate-x-1/2
          "
          style={{
            top: 'calc(100% + 8px)',
          }}
        >
          {showSearch && (
            <div
              ref={searchSectionRef}
              className="shrink-0 p-3 bg-slate-50 border-b border-slate-200"
            >
              <div className="relative">
                <Search
                  size={17}
                  className="absolute top-1/2 left-3 text-gray-400 -translate-y-1/2"
                />

                <input
                  type="text"
                  autoFocus
                  value={search}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search options..."
                  aria-label="Search options"
                  className="
                    w-full py-2.5 pr-9 pl-9
                    bg-white rounded-lg border border-slate-200
                    text-[#172554] placeholder:text-gray-400 text-sm
                    transition-all duration-200
                    focus:border-gray-400 focus:ring-2 focus:ring-gray-100
                    outline-none
                  "
                />

                {search && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    aria-label="Clear search"
                    className="
                      absolute top-1/2 right-3
                      text-gray-400
                      transition
                      hover:text-gray-600
                      -translate-y-1/2
                    "
                  >
                    <X size={15} />
                  </button>
                )}
              </div>
            </div>
          )}

          <div
            ref={optionsListRef}
            className="max-h-60 min-h-0 p-1.5 bg-white overflow-y-auto"
          >
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-3 text-gray-400 text-sm text-center">
                No options found
              </div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = option.value === value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`
                      flex items-center justify-between gap-2
                      w-full px-3 py-2.5 mb-1 last:mb-0
                      rounded-lg
                      whitespace-nowrap text-sm text-left
                      transition
                      ${
                        isSelected
                          ? 'bg-pink-50 font-medium text-pink-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    <span>{option.label}</span>

                    <span className="flex items-center justify-center shrink-0 w-4">
                      {isSelected && (
                        <Check size={16} className="text-pink-500" />
                      )}
                    </span>
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
