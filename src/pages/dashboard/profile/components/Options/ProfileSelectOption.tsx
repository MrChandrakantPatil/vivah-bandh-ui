import { Fragment, useState, type ReactNode } from 'react';
import { Search, X } from 'lucide-react';
import {
  filterProfileOptions,
  getFlatOptions,
  getProfileOptionRows,
  getOptionLabel,
} from '../../utils';
import type { ProfileOption } from '../../types';

interface ProfileSelectOptionProps {
  title: string;
  options: ProfileOption[];
  selectedValue: string;
  onSelect: (value: string) => void;

  isSaving?: boolean;
  showSearch?: boolean;
  searchThreshold?: number;
  showSelectedOption?: boolean;
  selectedLabel?: ReactNode;
  emptyMessage?: string;
}

export function ProfileSelectOption({
  title,
  options,
  selectedValue,
  onSelect,
  isSaving = false,
  showSearch = true,
  searchThreshold = 10,
  showSelectedOption = true,
  selectedLabel,
  emptyMessage = 'No matching options found.',
}: ProfileSelectOptionProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOptions = filterProfileOptions(options, searchQuery);
  
  const hasIndividualOptions = getFlatOptions(filteredOptions).some(
    (option) => option.value !== 'openToAll',
  );
  
  const shouldShowSearch =
    showSearch && getFlatOptions(options).length > searchThreshold;
  
  const displaySelectedLabel =
    selectedLabel ?? getOptionLabel(selectedValue, options);

  return (
    <>
      {shouldShowSearch && (
        <div className="shrink-0 px-4 py-3 border-b border-gray-100 sm:px-6">
          <div className="relative">
            <Search
              size={18}
              className="absolute top-1/2 left-3 text-gray-400 pointer-events-none -translate-y-1/2"
            />

            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={`Search ${title.toLowerCase()}...`}
              disabled={isSaving}
              className="
                w-full py-3 pr-10 pl-10
                bg-slate-50 rounded-xl border border-slate-200
                text-slate-700 placeholder:text-gray-400 text-sm
                transition
                disabled:opacity-60 focus:border-teal-500 focus:ring-2 focus:ring-teal-100
                outline-none
              "
            />

            {searchQuery.trim().length > 0 && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                disabled={isSaving}
                aria-label="Clear search"
                title="Clear search"
                className="
                  absolute top-1/2 right-3
                  flex items-center justify-center
                  w-6 h-6
                  rounded-full
                  text-gray-400
                  transition
                  hover:bg-gray-200 disabled:opacity-50 hover:text-gray-700
                  -translate-y-1/2
                "
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {shouldShowSearch && showSelectedOption && (
        <div className="shrink-0 px-4 py-3 border-b border-gray-100 sm:px-6">
          {selectedValue !== '' ? (
            <div className="flex flex-wrap gap-2">
              <div
                className="
                  inline-flex items-center gap-2
                  max-w-full px-5 py-1.5
                  bg-teal-700 rounded-full border border-teal-200
                  text-white
                "
              >
                <span className="font-medium text-sm wrap-break-words">
                  {displaySelectedLabel}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No option selected.</p>
          )}
        </div>
      )}

      <div className="flex-1 min-h-0 p-5 overflow-y-auto sm:p-6">
        {filteredOptions.length > 0 ? (
          <div className="space-y-3">
            {getProfileOptionRows(filteredOptions).map(
              ({ key, option, isGroup, depth }) => {
                if (isGroup)
                  return (
                    <h3
                      key={key}
                      className="pt-4 pb-1 font-semibold text-[#172554] text-sm uppercase"
                      style={{ marginLeft: Math.max(0, depth - 1) * 12 }}
                    >
                      {option.label}
                    </h3>
                  );

                const isSelected = option.value === selectedValue;

                return (
                  <Fragment key={key}>
                    <button
                      type="button"
                      disabled={isSaving}
                      onClick={() => onSelect(String(option.value))}
                      className={`
                        flex items-center justify-between
                        w-full px-3.5 py-3
                        rounded-xl border
                        text-left
                        transition-all
                        disabled:opacity-60 disabled:cursor-not-allowed
                        ${
                          isSelected
                            ? 'border-teal-300 bg-teal-50 text-teal-700'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-teal-200 hover:bg-slate-50'
                        }
                      `}
                    >
                      <span className="flex-1 min-w-0 font-medium text-sm truncate">
                        {option.label}
                      </span>

                      <span
                        className={`
                          flex items-center justify-center shrink-0
                          w-4.5 h-4.5
                          rounded-full border-2
                          ${
                            isSelected
                              ? 'border-teal-600 bg-white'
                              : 'border-gray-300 bg-white'
                          }
                        `}
                      >
                        {isSelected && (
                          <span className="w-2 h-2 bg-teal-600 rounded-full" />
                        )}
                      </span>
                    </button>

                    {depth === 0 &&
                      option.value === 'openToAll' &&
                      hasIndividualOptions && (
                        <div className="flex items-center gap-3 py-2">
                          <div className="flex-1 h-px bg-slate-200" />
                          
                          <span className="font-medium text-gray-400 text-xs">
                            OR SELECT INDIVIDUALLY
                          </span>
                          
                          <div className="flex-1 h-px bg-slate-200" />
                        </div>
                      )}
                  </Fragment>
                );
              },
            )}
          </div>
        ) : (
          <p className="py-6 text-gray-400 text-sm text-center">
            {emptyMessage}
          </p>
        )}
      </div>
    </>
  );
}
