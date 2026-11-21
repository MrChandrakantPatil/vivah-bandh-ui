import {
  DEFAULT_INCOME_RANGE,
  OPEN_TO_ALL_INCOME,
  incomeMaxOptions,
  incomeMinOptions,
  isValidIncomeRange,
  type AnnualIncomeValue,
} from '@/constants/options/incomeDetails';
import { SelectOption } from '@/components';

interface AnnualIncomeProps {
  selectedValue: AnnualIncomeValue;
  onChange: (value: AnnualIncomeValue) => void;
  isSaving?: boolean;
}

export function AnnualIncome({
  selectedValue,
  onChange,
  isSaving = false,
}: AnnualIncomeProps) {
  const incomeMode = selectedValue.mode;
  
  const incomeDraft = {
    min: selectedValue.min ?? '',
    max: selectedValue.max ?? '',
  };

  const updateIncomeMode = (mode: 'openToAll' | 'range') => {
    if (isSaving) return;
    
    onChange(
      mode === 'openToAll'
        ? { ...OPEN_TO_ALL_INCOME }
        : {
            mode,
            min: incomeDraft.min || DEFAULT_INCOME_RANGE.min,
            max: incomeDraft.max || DEFAULT_INCOME_RANGE.max,
          },
    );
  };

  const updateIncomeDraft = (
    updater: (previous: { min: string; max: string }) => {
      min: string;
      max: string;
    },
  ) => {
    if (!isSaving) onChange({ mode: 'range', ...updater(incomeDraft) });
  };

  const isValidRange =
    Boolean(incomeDraft.min && incomeDraft.max) &&
    isValidIncomeRange(incomeDraft.min, incomeDraft.max);

  return (
    <div className="flex-1 min-h-0 p-5 overflow-y-auto sm:p-6">
      <div className="space-y-5">
        <button
          type="button"
          disabled={isSaving}
          onClick={() => updateIncomeMode('openToAll')}
          className="
            flex items-center gap-3
            w-full pb-4
            border-b border-slate-200
            text-left
          "
        >
          <span
            className={`
              flex items-center justify-center shrink-0
              w-4.5 h-4.5
              bg-white rounded-full border-2
              transition-colors
              ${
                incomeMode === 'openToAll'
                  ? 'border-teal-600'
                  : 'border-gray-300'
              }
            `}
          >
            {incomeMode === 'openToAll' && (
              <span className="w-2 h-2 bg-teal-600 rounded-full" />
            )}
          </span>

          <span className="font-medium text-slate-700 text-sm">
            Open to All
          </span>
        </button>

        <button
          type="button"
          disabled={isSaving}
          onClick={() => updateIncomeMode('range')}
          className="
            flex items-center gap-3
            w-full pb-4
            border-b border-slate-200
            text-left
          "
        >
          <span
            className={`
              flex items-center justify-center shrink-0
              w-4.5 h-4.5
              bg-white rounded-full border-2
              transition-colors
              ${incomeMode === 'range' ? 'border-teal-600' : 'border-gray-300'}
            `}
          >
            {incomeMode === 'range' && (
              <span className="w-2 h-2 bg-teal-600 rounded-full" />
            )}
          </span>

          <span className="font-medium text-slate-700 text-sm">
            Specify an Income Range
          </span>
        </button>

        {incomeMode === 'range' && (
          <div className="space-y-4 pt-2">
            <p className="font-semibold text-slate-700 text-sm">
              Set Income Range
            </p>

            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <SelectOption
                value={incomeDraft.min}
                onChange={(value) =>
                  updateIncomeDraft((previous) => ({
                    ...previous,
                    min: value,
                  }))
                }
                options={incomeMinOptions}
                placeholder="Minimum"
                disabled={isSaving}
                className="mt-0"
              />

              <span className="font-medium text-slate-500 text-sm">to</span>

              <SelectOption
                value={incomeDraft.max}
                onChange={(value) =>
                  updateIncomeDraft((previous) => ({
                    ...previous,
                    max: value,
                  }))
                }
                options={incomeMaxOptions}
                placeholder="Maximum"
                disabled={isSaving}
                className="mt-0"
              />
            </div>

            {incomeDraft.min && incomeDraft.max && !isValidRange && (
              <p className="text-red-500 text-xs">
                Maximum income must be equal to or greater than minimum income.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
