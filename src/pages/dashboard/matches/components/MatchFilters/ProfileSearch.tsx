import { forwardRef, useEffect, useRef } from 'react';

import { Search, X } from 'lucide-react';

type ProfileSearchProps = {
  value: string;
  onChange: (value: string) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const ProfileSearch = forwardRef<HTMLDivElement, ProfileSearchProps>(
  function ProfileSearch({ value, onChange, isOpen, onOpen, onClose }, ref) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (isOpen) {
        inputRef.current?.focus();
      }
    }, [isOpen]);

    if (!isOpen) {
      return (
        <button
          type="button"
          aria-label="Search profiles"
          onClick={onOpen}
          className="
            flex items-center justify-center shrink-0
            w-10 h-10
            bg-white rounded-lg border border-gray-200
            text-gray-700
            transition
            hover:bg-gray-50 hover:border-gray-300
          "
        >
          <Search size={17} />
        </button>
      );
    }

    return (
      <div
        ref={ref}
        className="
          absolute inset-0 z-50
          flex items-center
          w-full h-11
          bg-white
        "
      >
        <button
          type="button"
          aria-label="Close search"
          onClick={onClose}
          className="
            flex items-center justify-center shrink-0
            w-10 h-10
            text-gray-400
            transition
            hover:text-gray-700
          "
        >
          <X size={18} />
        </button>

        <div
          className="
            flex flex-1 items-center gap-2
            min-w-0 h-10 px-3
            bg-white rounded-lg border border-gray-300
            focus-within:border-[#e21c56]
          "
        >
          <Search size={17} className="shrink-0 text-gray-500" />

          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Search profiles..."
            className="flex-1 min-w-0 bg-transparent placeholder:text-gray-400 text-sm outline-none"
          />

          {value && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => onChange('')}
              className="
                flex items-center justify-center shrink-0
                w-7 h-7
                rounded-full
                text-gray-400
                transition
                hover:bg-gray-100
              "
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>
    );
  },
);
