import { Fragment, useState } from 'react';
import { Check, Search, X } from 'lucide-react';
import {
  filterProfileOptions,
  getFlatOptions,
  getProfileOptionRows,
  getOptionLabel,
} from '../../utils';
import type { ProfileOption } from '../../types';

interface ProfileMultiSelectOptionProps {
  title: string;
  options: ProfileOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;

  isSaving?: boolean;
  showSearch?: boolean;
  searchThreshold?: number;
  showSelectedOptions?: boolean;
  openToAllValue?: string;
  emptyMessage?: string;
}

export function ProfileMultiSelectOption({
  title,
  options,
  selectedValues,
  onChange,
  isSaving = false,
  showSearch = true,
  searchThreshold = 10,
  showSelectedOptions = true,
  openToAllValue = 'openToAll',
  emptyMessage = 'No matching options found.',
}: ProfileMultiSelectOptionProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOptions = filterProfileOptions(options, searchQuery);

  const hasIndividualOptions = getFlatOptions(filteredOptions).some(
    (option) => option.value !== openToAllValue,
  );

  const shouldShowSearch =
    showSearch && getFlatOptions(options).length > searchThreshold;

  const hasOpenToAll = getFlatOptions(options).some(
    (option) => option.value === openToAllValue,
  );

  const updateSelection = (value: string) => {
    if (isSaving) return;

    if (value === openToAllValue) {
      onChange([openToAllValue]);
      return;
    }

    const next = selectedValues.includes(value)
      ? selectedValues.filter((item) => item !== value)
      : [...selectedValues.filter((item) => item !== openToAllValue), value];
    onChange(next.length === 0 && hasOpenToAll ? [openToAllValue] : next);
  };

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

      {showSelectedOptions && (
        <div className="shrink-0 px-4 py-3 border-b border-gray-100 sm:px-6">
          {selectedValues.length ? (
            <div className="flex flex-wrap gap-2">
              {selectedValues.map((value) => (
                <div
                  key={value}
                  className="
                    inline-flex items-center gap-2
                    max-w-full py-1.5 pr-1.5 pl-5
                    bg-teal-700 rounded-full border border-teal-200
                    text-white
                  "
                >
                  <span className="font-medium text-sm wrap-break-words">
                    {getOptionLabel(value, options)}
                  </span>

                  <button
                    type="button"
                    disabled={isSaving || value === openToAllValue}
                    onClick={() => updateSelection(value)}
                    aria-label={`Remove ${getOptionLabel(value, options)}`}
                    className="
                      flex items-center justify-center shrink-0
                      w-5 h-5
                      bg-white rounded-full
                      text-teal-600
                      hover:bg-teal-100 disabled:opacity-50 disabled:cursor-not-allowed
                    "
                  >
                    <X size={12} strokeWidth={2.5} />
                  </button>
                </div>
              ))}
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

                const isSelected = selectedValues.includes(option.value);

                return (
                  <Fragment key={key}>
                    <button
                      type="button"
                      disabled={isSaving}
                      onClick={() => updateSelection(option.value)}
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
                          rounded-[5px] border
                          ${
                            isSelected
                              ? 'border-teal-600 bg-teal-600 text-white'
                              : 'border-gray-300 bg-white'
                          }
                        `}
                      >
                        {isSelected && <Check size={12} strokeWidth={3} />}
                      </span>
                    </button>

                    {depth === 0 &&
                      option.value === openToAllValue &&
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
