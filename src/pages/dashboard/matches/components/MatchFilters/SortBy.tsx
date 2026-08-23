import { useState } from 'react';

import { ArrowDownUp, Check } from 'lucide-react';

type SortOption = {
  label: string;
  value: string;
};

type SortByProps = {
  value: string;
  options: SortOption[];
  onChange: (value: string) => void;
};

export function SortBy({ value, options, onChange }: SortByProps) {
  const [isOpen, setIsOpen] = useState(false);

  //   const selectedOption =
  //     options.find(
  //       (option) =>
  //         option.value === value,
  //     );

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        aria-label="Sort by"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className="
          flex items-center justify-center shrink-0
          w-10 h-10
          bg-white rounded-lg border border-gray-200
          text-gray-700
          transition
          hover:bg-gray-50 hover:border-gray-300
        "
      >
        <ArrowDownUp size={17} />
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close sort menu"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40"
          />

          <div
            className="
              absolute top-12 right-0 z-50
              w-52 p-1.5
              bg-white shadow-xl rounded-xl border border-gray-200
            "
          >
            {options.map((option) => {
              const isSelected = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`
                    flex items-center justify-between
                    w-full px-3 py-2.5
                    rounded-lg
                    text-sm text-left
                    transition
                    ${
                      isSelected
                        ? `
                          bg-[#fff5f8]
                          font-medium
                          text-[#e21c56]
                        `
                        : `
                          text-gray-700
                          hover:bg-gray-50
                        `
                    }
                  `}
                >
                  {option.label}

                  {isSelected && <Check size={16} className="text-[#e21c56]" />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
