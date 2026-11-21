import { useState } from 'react';
import { ArrowLeft, Check, X } from 'lucide-react';
import {
  validateProfileCustomValue,
  formatProfileFieldValue,
  toProfileOptions,
  getProfileFieldDraft,
  areProfileDraftsEqual,
} from '../../utils';
import { isValidIncomeRange } from '@/constants/options/incomeDetails';
import { RangeSlider } from '../Options/RangeSlider';
import { AnnualIncome } from '../Options/AnnualIncome';
import { ProfileCustomValue } from '../Options/ProfileCustomValue';
import { ProfileMultiSelectOption } from '../Options/ProfileMultiSelectOption';
import { ProfileSelectOption } from '../Options/ProfileSelectOption';
import type {
  ProfileViewFieldConfig,
  ProfileFieldDraftValue,
} from '../../types';

interface ProfileOptionsDrawerProps {
  isOpen: boolean;
  selectedField: ProfileViewFieldConfig | null | undefined;
  values?: unknown;
  onValueChange?: (key: string, value: ProfileFieldDraftValue) => void;
  isSaving?: boolean;
  showBackdrop?: boolean;
  onBack: () => void;
}

export function ProfileOptionsDrawer({
  isOpen,
  selectedField,
  values,
  onValueChange,
  isSaving = false,
  showBackdrop = false,
  onBack,
}: ProfileOptionsDrawerProps) {
  const title = selectedField?.label;
  
  const customField =
    selectedField &&
    ['text', 'number', 'date', 'time'].includes(selectedField.type ?? '')
      ? selectedField
      : null;

  const initialSelection = getProfileFieldDraft(selectedField, values);

  const [draft, setDraft] = useState<{
    field: typeof selectedField;
    value: ProfileFieldDraftValue;
  }>({
    field: selectedField,
    value: initialSelection,
  });

  const [wasOpen, setWasOpen] = useState(isOpen);

  if (wasOpen !== isOpen || (isOpen && draft.field !== selectedField)) {
    setWasOpen(isOpen);
    if (isOpen) {
      setDraft({ field: selectedField, value: initialSelection });
    }
  }

  const hasChanges = !areProfileDraftsEqual(draft.value, initialSelection);

  const customValue = typeof draft.value === 'string' ? draft.value : '';

  const customError = customField
    ? validateProfileCustomValue(customField, customValue)
    : null;

  const incomeDraft =
    typeof draft.value === 'object' &&
    !Array.isArray(draft.value) &&
    'mode' in draft.value
      ? draft.value
      : null;

  const invalidIncome =
    selectedField?.type === 'annualIncome' &&
    incomeDraft?.mode === 'range' &&
    (!incomeDraft.min ||
      !incomeDraft.max ||
      !isValidIncomeRange(incomeDraft.min, incomeDraft.max));

  const rangeDraft =
    typeof draft.value === 'object' &&
    !Array.isArray(draft.value) &&
    !('mode' in draft.value)
      ? draft.value
      : null;

  const handleBack = () => {
    if (isSaving) return;
    onBack();
  };

  const applyDisabled =
    isSaving || !hasChanges || Boolean(customError) || Boolean(invalidIncome);

  const handleApply = () => {
    if (applyDisabled) return;

    if (selectedField?.type === 'range' && rangeDraft) {
      const toStoredValue = (value: string) =>
        selectedField.storedUnit === 'cm'
          ? String(Number((Number(value) * 2.54).toFixed(2)))
          : value;

      if (selectedField.minKey)
        onValueChange?.(selectedField.minKey, toStoredValue(rangeDraft.min));

      if (selectedField.maxKey)
        onValueChange?.(selectedField.maxKey, toStoredValue(rangeDraft.max));

      onBack();

      return;
    }
    if (
      selectedField?.type === 'multiSelect' ||
      selectedField?.type === 'annualIncome' ||
      Boolean(customField)
    ) {
      if (selectedField)
        onValueChange?.(
          selectedField.key,
          customField ? customValue.trim() : draft.value,
        );
    }

    onBack();
  };

  return (
    <div
      className={`
        fixed inset-0 z-160
        h-full
        transition-[visibility] duration-0
        ${isOpen ? 'visible delay-0' : 'invisible delay-300'}
      `}
      aria-hidden={!isOpen}
      inert={!isOpen}
    >
      <button
        type="button"
        aria-label="Close field options"
        tabIndex={-1}
        disabled={!isOpen || isSaving}
        onClick={handleBack}
        className={`
          absolute inset-0
          w-full h-full
          bg-transparent
          transition-opacity duration-300 ease-in-out
          ${showBackdrop ? 'sm:bg-black/40 sm:backdrop-blur-[2px]' : ''}
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={title ?? 'Field options'}
        className={`
          absolute inset-y-0 right-0
          flex flex-col
          w-full max-w-md h-full
          bg-white
          transition-transform duration-300 ease-in-out
          transform-gpu
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {title && (
          <div
            className="
              relative z-10
              flex items-center gap-3 shrink-0
              px-5 py-5
              bg-white shadow-[0_4px_12px_rgba(15,23,42,0.06)] border-b border-slate-200
              sm:px-6
            "
          >
            <button
              type="button"
              onClick={handleBack}
              disabled={isSaving}
              className="
                flex items-center justify-center shrink-0
                w-9 h-9
                bg-gray-100 rounded-full
                text-gray-600
                transition
                hover:bg-gray-200 disabled:opacity-50
              "
              aria-label="Go back"
            >
              <ArrowLeft size={19} />
            </button>

            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-[#172554] text-base truncate">
                {title}
              </h3>
            </div>
          </div>
        )}

        {selectedField?.type === 'select' ? (
          <ProfileSelectOption
            key={selectedField.key}
            title={selectedField.label}
            options={toProfileOptions(selectedField.options ?? [])}
            selectedValue={typeof draft.value === 'string' ? draft.value : ''}
            onSelect={(value) => {
              if (isSaving) return;
              setDraft({ field: selectedField, value });
              if (!areProfileDraftsEqual(value, initialSelection)) {
                onValueChange?.(selectedField.key, value);
              }
              onBack();
            }}
            isSaving={isSaving}
            selectedLabel={
              draft.value
                ? formatProfileFieldValue(selectedField, draft.value)
                : null
            }
          />
        ) : selectedField?.type === 'multiSelect' ? (
          <ProfileMultiSelectOption
            key={selectedField.key}
            title={selectedField.label}
            options={toProfileOptions(selectedField.options ?? [])}
            selectedValues={Array.isArray(draft.value) ? draft.value : []}
            openToAllValue={selectedField.exclusiveOptionValue}
            onChange={(value) => {
              if (!isSaving) setDraft({ field: selectedField, value });
            }}
            isSaving={isSaving}
          />
        ) : selectedField?.type === 'range' && rangeDraft ? (
          <RangeSlider
            label={selectedField.label}
            min={selectedField.min ?? 0}
            max={selectedField.max ?? 100}
            step={selectedField.step ?? 1}
            unit={selectedField.suffix}
            value={rangeDraft}
            onChange={(value) => {
              if (!isSaving) setDraft({ field: selectedField, value });
            }}
            disabled={isSaving}
          />
        ) : selectedField?.type === 'annualIncome' && incomeDraft ? (
          <AnnualIncome
            selectedValue={incomeDraft}
            onChange={(value) => {
              if (!isSaving) setDraft({ field: selectedField, value });
            }}
            isSaving={isSaving}
          />
        ) : customField ? (
          <ProfileCustomValue
            field={customField}
            value={customValue}
            onChange={(value) => {
              if (!isSaving) setDraft({ field: selectedField, value });
            }}
            isSaving={isSaving}
            error={customError}
          />
        ) : null}

        {selectedField?.type !== 'select' && (
          <div
            className="
              relative z-10
              flex gap-3 shrink-0
              p-4
              bg-white shadow-[0_-4px_12px_rgba(15,23,42,0.06)] border-t border-slate-200
              sm:p-6
            "
          >
            <button
              type="button"
              onClick={handleBack}
              disabled={isSaving}
              className="
                flex-1 flex items-center justify-center gap-3
                px-4 py-3
                bg-white rounded-xl border border-slate-200
                font-semibold text-slate-600 text-sm
                transition
                hover:bg-slate-50 disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              <X size={16} />
              Cancel
            </button>

            <button
              type="button"
              onClick={handleApply}
              disabled={applyDisabled}
              className="
                flex-1 flex items-center justify-center gap-3
                px-4 py-3
                bg-transparent rounded-xl border border-pink-500
                font-semibold text-pink-600 text-sm
                transition
                disabled:opacity-60 hover:border-pink-600 hover:text-pink-700 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2
              "
            >
              <Check size={16} />
              {isSaving ? 'Applying...' : 'Apply'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
