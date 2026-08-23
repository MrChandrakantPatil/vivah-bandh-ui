import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronDown, RotateCcw, Search, X } from 'lucide-react';
import type { MultiSelectFilterProps } from './types';

export function MultiSelectFilter({
  title,
  icon: Icon,
  options,
  selectedOptions,
  setSelectedOptions,
}: MultiSelectFilterProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [draftSelectedOptions, setDraftSelectedOptions] =
    useState<string[]>(selectedOptions);

  useEffect(() => {
    if (!isModalOpen) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isModalOpen]);

  const handleModalOpen = () => {
    setDraftSelectedOptions(selectedOptions);
    setSearchQuery('');
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const hasSelectedOptions = selectedOptions.length > 0;
  const hasDrafSelectedOption = draftSelectedOptions.length > 0;

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );

  const handleFilterOptionClick = (option: string) => {
    setDraftSelectedOptions((current) => {
      if (current.includes(option)) {
        return current.filter((item) => item !== option);
      }

      return [...current, option];
    });
  };

  const handleRemoveOption = (option: string) => {
    setDraftSelectedOptions((current) =>
      current.filter((item) => item !== option),
    );
  };

  const handleClearAll = () => {
    setDraftSelectedOptions([]);
  };

  const handleApply = () => {
    setSelectedOptions(draftSelectedOptions);
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleModalOpen}
        aria-label={title}
        aria-expanded={isModalOpen}
        className={`
          flex items-center gap-2 shrink-0
          h-10 px-3
          rounded-lg border
          whitespace-nowrap font-semibold text-sm
          transition
          ${
            hasSelectedOptions || isModalOpen
              ? 'border-gray-500 bg-gray-200 text-gray-800'
              : 'border-gray-200 bg-white text-gray-800 hover:border-gray-300 hover:bg-gray-50'
          }
        `}
      >
        <Icon size={17} strokeWidth={2} className="shrink-0 text-gray-700" />

        <span>{title}</span>

        <span className="flex items-center justify-center shrink-0 w-5">
          {!hasSelectedOptions ? (
            <ChevronDown
              size={16}
              strokeWidth={2}
              className="shrink-0 text-gray-600"
            />
          ) : (
            <span
              className="
                flex items-center justify-center
                min-w-5 h-5 px-1
                bg-gray-600 rounded-full
                text-white text-[10px]
              "
            >
              {selectedOptions.length}
            </span>
          )}
        </span>
      </button>

      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleModalClose}
          className="
            fixed inset-0 z-50
            flex items-end justify-center
            bg-black/40
            sm:items-center sm:p-3 md:p-4
          "
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${title}-dialog-title`}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            onClick={(event) => event.stopPropagation()}
            className="
              relative
              flex flex-col
              w-full h-[88dvh] max-h-[88dvh] min-h-0
              bg-white shadow-2xl rounded-t-2xl
              overflow-hidden
              sm:w-200 sm:h-142 sm:max-h-[calc(100dvh-32px)] sm:rounded-xl
            "
          >
            <div className="absolute top-1.5 left-1/2 sm:hidden -translate-x-1/2">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>

            <div
              className="
                flex items-center justify-between shrink-0
                px-6 py-4
                border-b border-gray-300
                sm:px-8 sm:py-5.5
              "
            >
              <div className="flex items-center">
                <Icon
                  size={26}
                  strokeWidth={2}
                  className="shrink-0 text-gray-700"
                />

                <h2
                  id={`${title}-dialog-title`}
                  className="ml-2 font-semibold text-gray-900 text-xl sm:text-2xl"
                >
                  {title} Filters
                </h2>
              </div>

              <button
                type="button"
                aria-label="Close"
                onClick={handleModalClose}
                className="
                  flex items-center justify-center shrink-0
                  w-8 h-8
                  rounded-full
                  text-gray-500
                  transition
                  hover:bg-gray-100 hover:text-gray-900
                "
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            <div
              className="
                shrink-0
                px-5 py-3 mb-4
                bg-gray-100/50 border-b border-gray-300
                sm:px-8
              "
            >
              <div
                className="
                  flex items-center
                  w-full px-2
                  bg-white rounded-lg border border-gray-300
                  transition
                  focus-within:border-gray-500
                "
              >
                <Search className="shrink-0 w-5 h-5 ml-1 text-gray-500" />

                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder={`Search ${title}`}
                  className="
                    w-full py-2.25 pr-4 pl-2
                    text-gray-700 text-sm
                    outline-none
                  "
                />

                {searchQuery && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => setSearchQuery('')}
                    className="
                      flex items-center justify-center shrink-0
                      w-7 h-7
                      rounded-full
                      text-gray-400
                      transition
                      hover:bg-gray-100
                    "
                  >
                    <X size={15} className="text-gray-500" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1 min-h-0 pr-5 sm:pr-8">
              <div className="h-full px-5 overflow-y-auto overscroll-contain sm:px-8 filter-scrollbar">
                {filteredOptions.length > 0 ? (
                  <div
                    className="
                      grid grid-cols-2 gap-x-3 gap-y-0
                      sm:grid-cols-4 sm:gap-x-6 sm:gap-y-1
                    "
                  >
                    {filteredOptions.map((option) => {
                      const isSelected = draftSelectedOptions.includes(option);

                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleFilterOptionClick(option)}
                          className="
                            flex items-center gap-3
                            w-full min-w-0 px-2 py-2
                            rounded-md
                            text-left
                            transition
                            hover:bg-gray-50
                          "
                        >
                          <span
                            className={`
                              flex items-center justify-center shrink-0
                              w-5 h-5
                              rounded-sm border
                              ${
                                isSelected
                                  ? 'border-gray-600 bg-gray-600'
                                  : 'border-gray-300 bg-white'
                              }
                            `}
                          >
                            {isSelected && (
                              <Check
                                size={12}
                                strokeWidth={3}
                                className="text-white"
                              />
                            )}
                          </span>

                          <span
                            className={`
                              flex-1
                              min-w-0
                              text-sm truncate
                              ${
                                isSelected
                                  ? 'font-semibold text-gray-800'
                                  : 'font-medium text-gray-800'
                              }
                            `}
                          >
                            {option}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex items-center justify-center min-h-32 text-gray-400 text-sm">
                    No {title.toLowerCase()} found
                  </div>
                )}
              </div>
            </div>

            <div
              className="
                flex flex-col gap-2 shrink-0
                px-5 py-3 mt-3
                bg-white border-t border-gray-300
                sm:flex-row sm:items-center sm:gap-5 sm:px-8 sm:py-4
              "
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <p className="font-medium text-gray-800">
                    Selected ({draftSelectedOptions.length})
                  </p>

                  <span className="w-px h-4 bg-gray-300" aria-hidden="true" />

                  <button
                    type="button"
                    onClick={handleClearAll}
                    disabled={!hasDrafSelectedOption}
                    className={`
                      flex items-center gap-1.5 shrink-0
                      rounded-lg
                      font-medium text-gray-500 text-xs
                      transition
                      ${
                        !hasDrafSelectedOption
                          ? 'disabled:cursor-not-allowed disabled:opacity-40'
                          : 'hover:text-gray-900 hover:bg-gray-50'
                      }
                    `}
                  >
                    <RotateCcw
                      size={15}
                      strokeWidth={1.8}
                      className="text-gray-600"
                    />

                    <span>Clear All</span>
                  </button>
                </div>

                <div className="h-8 mt-1.5">
                  {hasDrafSelectedOption ? (
                    <div
                      className="
                        flex items-center gap-2
                        min-w-0 h-8
                        overflow-x-auto
                        hide-scrollbar
                      "
                    >
                      {draftSelectedOptions.map((option) => (
                        <span
                          key={option}
                          className="
                            flex items-center gap-1 shrink-0
                            h-7 px-2.5
                            bg-gray-100 rounded-full border border-gray-300
                            font-medium text-gray-700 text-xs
                          "
                        >
                          <span className="max-w-32 truncate">{option}</span>

                          <button
                            type="button"
                            aria-label={`Remove ${option}`}
                            onClick={() => handleRemoveOption(option)}
                            className="
                              flex items-center justify-center
                              w-4 h-4
                              rounded-full
                              text-gray-500
                              transition
                              hover:bg-gray-200
                            "
                          >
                            <X size={11} />
                          </button>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center h-8">
                      <span className="text-gray-400 text-sm">
                        No {title.toLowerCase()} selected
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="shrink-0 w-px h-10 bg-gray-200 sm:block hidden" />

              <div
                className="
                  flex items-center gap-2 shrink-0
                  w-full
                  sm:gap-3 sm:w-auto
                "
              >
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="
                    flex-1
                    px-5 py-2
                    rounded-lg border border-gray-300
                    font-medium text-gray-700 text-sm
                    transition
                    hover:bg-gray-50
                    sm:flex-none
                  "
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleApply}
                  className="
                    flex-1
                    px-6 py-2
                    bg-gray-700 rounded-lg
                    font-medium text-white text-sm
                    transition
                    hover:bg-gray-800
                    sm:flex-none
                  "
                >
                  Apply
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
