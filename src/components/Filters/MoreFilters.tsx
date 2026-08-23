import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Check,
  ChevronDown,
  RotateCcw,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import type {
  MoreFilterOption,
  MoreFiltersProps,
  SelectedMoreFilters,
} from '@/components/Filters/types';

export function MoreFilters({
  title = 'More Filters',
  icon: Icon = SlidersHorizontal,
  options,
  selectedFilters,
  setSelectedFilters,
}: MoreFiltersProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeFilter, setActiveFilter] = useState<MoreFilterOption | null>(
    options[0] ?? null,
  );

  const [draftSelectedFilters, setDraftSelectedFilters] =
    useState<SelectedMoreFilters>(selectedFilters);

  const filterTabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    if (!isModalOpen) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isModalOpen]);

  const selectedFilterCount = Object.keys(selectedFilters).length;

  const draftSelectedFilterCount = Object.keys(draftSelectedFilters).length;

  const hasSelectedFilters = selectedFilterCount > 0;

  const handleModalOpen = () => {
    setDraftSelectedFilters(selectedFilters);
    setActiveFilter(options[0] ?? null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setDraftSelectedFilters(selectedFilters);
    setIsModalOpen(false);
  };

  const handleClearAll = () => {
    setDraftSelectedFilters({});
  };

  const handleFilterTabClick = (filter: MoreFilterOption) => {
    setActiveFilter(filter);

    filterTabRefs.current[filter.key]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  };

  const handleFilterOptionClick = (option: string) => {
    if (!activeFilter) return;

    setDraftSelectedFilters((current) => {
      const selectedOption = current[activeFilter.key];

      if (selectedOption === option) {
        const updatedFilters = {
          ...current,
        };

        delete updatedFilters[activeFilter.key];

        return updatedFilters;
      }

      return {
        ...current,
        [activeFilter.key]: option,
      };
    });
  };

  const handleRemoveOption = (filterKey: string) => {
    setDraftSelectedFilters((current) => {
      const updatedFilters = {
        ...current,
      };

      delete updatedFilters[filterKey];

      return updatedFilters;
    });
  };

  const handleApply = () => {
    setSelectedFilters(draftSelectedFilters);
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
            hasSelectedFilters || isModalOpen
              ? 'border-gray-500 bg-gray-200 text-gray-800'
              : 'border-gray-200 bg-white text-gray-800 hover:border-gray-300 hover:bg-gray-50'
          }
        `}
      >
        <Icon size={17} strokeWidth={2} className="shrink-0 text-gray-700" />

        <span>{title}</span>

        <span className="flex items-center justify-center shrink-0 w-5">
          {!hasSelectedFilters ? (
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
              {selectedFilterCount}
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
                  {title}
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
                px-5 py-3
                bg-gray-100/50 border-b border-gray-300
                sm:px-8
              "
            >
              <div className="overflow-x-auto hide-scrollbar">
                <div className="flex items-center gap-2 w-max min-w-full">
                  {options.map((filter) => {
                    const FilterIcon = filter.icon;

                    const isActive = activeFilter?.key === filter.key;

                    const hasSelection = Boolean(
                      draftSelectedFilters[filter.key],
                    );

                    return (
                      <button
                        key={filter.key}
                        ref={(element) => {
                          filterTabRefs.current[filter.key] = element;
                        }}
                        type="button"
                        onClick={() => handleFilterTabClick(filter)}
                        className={`
                          flex items-center gap-2 shrink-0
                          h-10 px-3
                          rounded-lg border
                          whitespace-nowrap font-semibold text-sm
                          transition
                          ${
                            isActive
                              ? 'border-gray-600 bg-gray-700 font-semibold text-white shadow-sm'
                              : hasSelection
                                ? 'border-gray-500 bg-gray-200 font-semibold text-gray-800'
                                : 'border-gray-300 bg-white font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                          }
                        `}
                      >
                        <FilterIcon
                          size={17}
                          strokeWidth={2}
                          className={
                            isActive
                              ? 'shrink-0 text-white'
                              : 'shrink-0 text-gray-700'
                          }
                        />

                        <span>{filter.title}</span>

                        <span className="flex items-center justify-center shrink-0 w-5">
                          {!hasSelection ? (
                            <ChevronDown
                              size={16}
                              strokeWidth={2}
                              className={
                                isActive ? 'text-white' : 'text-gray-600'
                              }
                            />
                          ) : (
                            <span
                              className={`
                                flex items-center justify-center
                                min-w-4 h-4 px-1
                                rounded-full
                                font-semibold text-[10px]
                                ${
                                  isActive
                                    ? 'bg-white text-gray-700'
                                    : 'bg-gray-600 text-white'
                                }
                              `}
                            >
                              1
                            </span>
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex-1 min-h-0 px-5 sm:px-8">
              {activeFilter && (
                <div className="flex flex-col h-full min-h-0">
                  <div className="flex items-center gap-2 shrink-0 mt-5 mb-3">
                    {(() => {
                      const ActiveFilterIcon = activeFilter.icon;

                      return (
                        <ActiveFilterIcon
                          size={20}
                          strokeWidth={1.8}
                          className="text-gray-700"
                        />
                      );
                    })()}

                    <h3 className="font-semibold text-gray-900 text-base sm:text-lg">
                      Select {activeFilter.title}
                    </h3>
                  </div>

                  <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain filter-scrollbar">
                    {activeFilter.options.length > 0 ? (
                      <div
                        className="
                          grid grid-cols-2 gap-x-3 gap-y-0
                          sm:grid-cols-4 sm:gap-x-6 sm:gap-y-1
                        "
                      >
                        {activeFilter.options.map((option) => {
                          const isSelected =
                            draftSelectedFilters[activeFilter.key] === option;

                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() => handleFilterOptionClick(option)}
                              className={`
                                flex items-center gap-3
                                w-full min-w-0 px-2 py-2
                                rounded-md
                                text-left
                                transition
                                ${
                                  isSelected
                                    ? 'bg-gray-100'
                                    : 'hover:bg-gray-50'
                                }
                              `}
                            >
                              <span
                                className={`
                                  flex items-center justify-center shrink-0
                                  w-5 h-5
                                  rounded-sm border
                                  transition
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
                                      : 'font-medium text-gray-700'
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
                        No {activeFilter.title.toLowerCase()} found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div
              className="
                flex flex-col gap-2 shrink-0
                px-5 py-3 mt-4
                border-t border-gray-300
                sm:flex-row sm:items-center sm:gap-5 sm:px-8 sm:py-4
              "
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <p className="font-medium text-gray-800">
                    Selected ({draftSelectedFilterCount})
                  </p>

                  <span aria-hidden="true" className="w-px h-4 bg-gray-300" />

                  <button
                    type="button"
                    onClick={handleClearAll}
                    disabled={draftSelectedFilterCount === 0}
                    className="
                      flex items-center gap-1.5 shrink-0
                      rounded-lg
                      font-medium text-gray-600 text-xs
                      transition
                      hover:bg-gray-100 disabled:opacity-40 hover:text-gray-900 disabled:cursor-not-allowed
                    "
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
                  {draftSelectedFilterCount > 0 ? (
                    <div
                      className="
                        flex items-center gap-2
                        min-w-0 h-8
                        overflow-x-auto
                        hide-scrollbar
                      "
                    >
                      {Object.entries(draftSelectedFilters).map(
                        ([filterKey, selectedOption]) => {
                          const selectedFilter = options.find(
                            (filter) => filter.key === filterKey,
                          );

                          return (
                            <span
                              key={filterKey}
                              className="
                                flex items-center gap-1 shrink-0
                                h-7 px-2.5
                                bg-gray-100 rounded-full border border-gray-300
                                font-medium text-gray-700 text-xs
                              "
                            >
                              <span className="max-w-48 truncate">
                                {selectedFilter
                                  ? `${selectedFilter.title}: ${selectedOption}`
                                  : selectedOption}
                              </span>

                              <button
                                type="button"
                                aria-label={`Remove ${selectedFilter?.title ?? 'filter'}`}
                                onClick={() => handleRemoveOption(filterKey)}
                                className="
                                  flex items-center justify-center
                                  w-4 h-4
                                  rounded-full
                                  text-gray-500
                                  transition
                                  hover:bg-gray-200 hover:text-gray-900
                                "
                              >
                                <X size={11} />
                              </button>
                            </span>
                          );
                        },
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center h-8">
                      <span className="text-gray-400 text-sm">
                        No filters selected
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
                    hover:bg-gray-100
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
