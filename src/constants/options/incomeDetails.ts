import type { SelectOptionType } from '@/types/common.types';

export type AnnualIncomeMode = 'openToAll' | 'range';

// Shape stored in the DB and sent to the API
export interface AnnualIncomeValue {
  mode: AnnualIncomeMode;
  min: string | null;
  max: string | null;
}

export const incomeOptions = [
  { label: 'Upto ₹2 Lakh', value: 'upto2Lakh' },
  { label: '₹2 Lakh to ₹5 Lakh', value: '2To5Lakh' },
  { label: '₹5 Lakh to ₹10 Lakh', value: '5To10Lakh' },
  { label: '₹10 Lakh to ₹20 Lakh', value: '10To20Lakh' },
  { label: '₹20 Lakh to ₹30 Lakh', value: '20To30Lakh' },
  { label: '₹30 Lakh to ₹50 Lakh', value: '30To50Lakh' },
  { label: '₹50 Lakh to ₹1 Crore', value: '50To100Lakh' },
  { label: 'Above ₹1 Crore', value: 'above100Lakh' },
];

// Values must match the schema enums exactly.
// '>1'   = Below 1 Lakh
// '>100' = Above 1 Crore
// '100'  = 1 Crore

export const incomeMinOptions: SelectOptionType[] = [
  { label: 'Below 1 Lakh', value: '>1' },
  { label: '2 Lakh', value: '2' },
  { label: '5 Lakh', value: '5' },
  { label: '7 Lakh', value: '7' },
  { label: '10 Lakh', value: '10' },
  { label: '15 Lakh', value: '15' },
  { label: '20 Lakh', value: '20' },
  { label: '30 Lakh', value: '30' },
  { label: '50 Lakh', value: '50' },
];

export const incomeMaxOptions: SelectOptionType[] = [
  { label: '5 Lakh', value: '5' },
  { label: '7 Lakh', value: '7' },
  { label: '10 Lakh', value: '10' },
  { label: '15 Lakh', value: '15' },
  { label: '20 Lakh', value: '20' },
  { label: '30 Lakh', value: '30' },
  { label: '50 Lakh', value: '50' },
  { label: '75 Lakh', value: '75' },
  { label: '1 Crore', value: '100' },
  { label: 'Above 1 Crore', value: '>100' },
];

// Same defaults as the schema
export const DEFAULT_INCOME_RANGE = { min: '2', max: '30' };

export const OPEN_TO_ALL_INCOME: AnnualIncomeValue = {
  mode: 'openToAll',
  min: null,
  max: null,
};

// Converts a stored value to a number so two values can be compared
const toIncomeNumber = (value: string): number => {
  if (value === '>1') return 0;
  if (value === '>100') return Infinity;

  return Number(value);
};

// Both values must be selected and max must be >= min
export const isValidIncomeRange = (min: string, max: string): boolean => {
  if (!min || !max) return false;

  return toIncomeNumber(max) > toIncomeNumber(min);
};

const findLabel = (options: SelectOptionType[], value: string | null) =>
  options.find((option) => String(option.value) === value)?.label ?? '';

// Text shown on the field row, e.g. "2 Lakh to 30 Lakh"
export const formatAnnualIncome = (
  value: Partial<AnnualIncomeValue> | undefined | null,
): string => {
  if (!value || value.mode === 'openToAll') return 'Open to All';

  const minLabel = findLabel(incomeMinOptions, value.min ?? null);
  const maxLabel = findLabel(incomeMaxOptions, value.max ?? null);

  if (!minLabel || !maxLabel) return 'Open to All';

  return `${minLabel} to ${maxLabel}`;
};
