import { getProfileFieldValue } from './profileFieldUtils';
import {
  DEFAULT_INCOME_RANGE,
  OPEN_TO_ALL_INCOME,
  type AnnualIncomeValue,
} from '@/constants/options/incomeDetails';
import type {
  ProfileFieldDraftValue,
  ProfileOption,
  ProfileOptionRow,
  ProfileViewFieldConfig,
  ProfileRangeValue,
  ProfileFieldOption,
} from '../types';

export const toProfileOptions = (
  options: ProfileFieldOption[],
): ProfileOption[] =>
  options.map((option) => ({
    label: option.label,
    value: option.value ?? option.label,
    ...(option.options ? { options: toProfileOptions(option.options) } : {}),
  }));

const normalizeValue = (value: unknown) =>
  String(value ?? '')
    .trim()
    .toLowerCase();

export const getFlatOptions = (options: ProfileOption[]): ProfileOption[] =>
  options.flatMap((option) =>
    option.options ? getFlatOptions(option.options) : [option],
  );

export const getOptionLabel = (value: string, options: ProfileOption[]) =>
  getFlatOptions(options).find((option) => option.value === value)?.label ??
  value;

export function filterProfileOptions(
  options: ProfileOption[],
  query: string,
): ProfileOption[] {
  const normalized = normalizeValue(query);

  if (!normalized) return options;
  
  return options.flatMap((option) => {
    if (!option.options)
      return normalizeValue(option.label).includes(normalized) ? [option] : [];
  
    const children = normalizeValue(option.label).includes(normalized)
      ? option.options
      : filterProfileOptions(option.options, normalized);
  
    return children.length ? [{ ...option, options: children }] : [];
  });
}

export function getProfileOptionRows(
  options: ProfileOption[],
  depth = 0,
  parentKey = '',
): ProfileOptionRow[] {
  return options.flatMap((option) => {
    const key = `${parentKey}/${option.value}`;
    const row = { key, option, isGroup: Boolean(option.options), depth };
    
    return option.options
      ? [row, ...getProfileOptionRows(option.options, depth + 1, key)]
      : [row];
  });
}

export function getIncomeDraft(value: unknown): AnnualIncomeValue {
  if (value === 'openToAll') return { ...OPEN_TO_ALL_INCOME };
  
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const income = value as Record<string, unknown>;
  
    if (income.mode === 'openToAll') return { ...OPEN_TO_ALL_INCOME };
  
    if (income.mode === 'range')
      return {
        mode: 'range',
        min: income.min == null ? '' : String(income.min),
        max: income.max == null ? '' : String(income.max),
      };
  }
  
  return { mode: 'range', ...DEFAULT_INCOME_RANGE };
}

export function getRangeDraft(
  field: Pick<ProfileViewFieldConfig, 'min' | 'max' | 'step' | 'suffix'>,
  value: unknown,
): ProfileRangeValue {
  const bounds =
    value && typeof value === 'object'
      ? (value as Record<string, unknown>)
      : {};

  const min = field.min ?? 0;
  const max = field.max ?? 100;
  const step = field.step ?? 1;

  const gap = Math.min(
    max - min,
    field.suffix === 'years' ? 3 : field.suffix === 'inches' ? 6 : step,
  );
  
  const bound = (value: unknown, fallback: number) => {
    const parsed = value == null || value === '' ? fallback : Number(value);
  
    const snapped =
      min +
      Math.round(((Number.isFinite(parsed) ? parsed : fallback) - min) / step) *
        step;
  
    return Math.min(max, Math.max(min, snapped));
  };

  let low = bound(bounds.min, min);
  let high = bound(bounds.max, max);

  if (low > high) [low, high] = [high, low];

  if (high - low < gap) {
    high = Math.min(low + gap, max);
    low = Math.max(high - gap, min);
  }

  return { min: String(low), max: String(high) };
}

export function areProfileDraftsEqual(
  first: ProfileFieldDraftValue,
  second: ProfileFieldDraftValue,
): boolean {
  if (Array.isArray(first) && Array.isArray(second)) {
    const sortedSecond = [...second].sort();

    return (
      first.length === second.length &&
      [...first].sort().every((value, index) => value === sortedSecond[index])
    );
  }

  if (typeof first === 'string' && typeof second === 'string') {
    return first.trim() === second.trim();
  }

  return JSON.stringify(first) === JSON.stringify(second);
}

export function getProfileFieldDraft(
  selectedField: ProfileViewFieldConfig | null | undefined,
  values: unknown,
): ProfileFieldDraftValue {
  const initialValue = selectedField
    ? getProfileFieldValue(selectedField, values)
    : '';

  if (selectedField?.type === 'multiSelect') {
    const selection = Array.isArray(initialValue)
      ? initialValue.map(String)
      : initialValue == null || initialValue === ''
        ? []
        : [String(initialValue)];

    const exclusiveOption = selectedField.exclusiveOptionValue;

    if (!exclusiveOption) return selection;

    const individualOptions = selection.filter(
      (value) => value !== exclusiveOption,
    );
    
    return individualOptions.length ? individualOptions : [exclusiveOption];
  }

  return selectedField?.type === 'range'
    ? getRangeDraft(selectedField, initialValue)
    : selectedField?.type === 'annualIncome'
      ? getIncomeDraft(initialValue)
      : selectedField?.type === 'date' && typeof initialValue === 'string'
        ? initialValue.slice(0, 10)
        : String(
            Array.isArray(initialValue)
              ? (initialValue[0] ?? '')
              : (initialValue ?? ''),
          );
}
