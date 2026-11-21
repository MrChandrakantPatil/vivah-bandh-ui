import { formatAnnualIncome } from '@/constants/options/incomeDetails';
import { formatDate } from '@/utils';
import type { ProfileFieldOption, ProfileViewFieldConfig } from '../types';

export function getProfileValue(values: unknown, path: string): unknown {
  if (values && typeof values === 'object' && Object.hasOwn(values, path)) {
    return (values as Record<string, unknown>)[path];
  }

  return path
    .split('.')
    .reduce<unknown>(
      (current, key) =>
        current && typeof current === 'object'
          ? (current as Record<string, unknown>)[key]
          : undefined,
      values,
    );
}

export function getProfileFieldValue(
  field: ProfileViewFieldConfig,
  values: unknown,
): unknown {
  if (field.type === 'range') {
    const displayValue = (key?: string) => {
      const value = key ? getProfileValue(values, key) : undefined;
      if (value == null || value === '') return value;
      return field.storedUnit === 'cm' ? Number(value) / 2.54 : value;
    };

    return { min: displayValue(field.minKey), max: displayValue(field.maxKey) };
  }

  return getProfileValue(values, field.key);
}

function findLabel(
  options: ProfileFieldOption[],
  value: string,
): string | undefined {
  for (const option of options) {
    if (option.value === value) return option.label;

    const nested = option.options && findLabel(option.options, value);

    if (nested !== undefined) return nested;
  }
}

export function formatProfileFieldValue(
  field: ProfileViewFieldConfig,
  value: unknown,
): string {
  if (value == null || value === '' || (Array.isArray(value) && !value.length))
    return '--';

  if (field.type === 'annualIncome') {
    if (value === 'openToAll') return formatAnnualIncome({ mode: 'openToAll' });

    if (typeof value !== 'object' || Array.isArray(value) || !('mode' in value))
      return '--';

    const income = value as Record<string, unknown>;

    if (income.mode !== 'range' && income.mode !== 'openToAll') return '--';

    return formatAnnualIncome({
      mode: income.mode,
      min: income.min == null ? null : String(income.min),
      max: income.max == null ? null : String(income.max),
    });
  }

  if (field.type === 'time') return formatProfileBirthTime(String(value));

  if (field.type === 'date') return formatDate(String(value));

  if (field.type === 'range') {
    const { min, max } = value as { min?: unknown; max?: unknown };
    const hasMin = min != null && min !== '';
    const hasMax = max != null && max !== '';
    const formatBound = (bound: unknown) =>
      formatProfileRangeBound(bound, field.suffix);

    if (hasMin && hasMax) return `${formatBound(min)} to ${formatBound(max)}`;

    if (hasMin) return `${formatBound(min)} and above`;

    if (hasMax) return `Up to ${formatBound(max)}`;

    return '--';
  }

  const label = (item: unknown) =>
    findLabel(field.options ?? [], String(item)) ?? String(item);
  return Array.isArray(value) ? value.map(label).join(', ') : label(value);
}

export function isProfileValueEmpty(value: unknown): boolean {
  return (
    value == null || value === '' || (Array.isArray(value) && !value.length)
  );
}

export function validateProfileCustomValue(
  field: ProfileViewFieldConfig,
  value: string,
): string | null {
  if (field.required && !value.trim()) return `${field.label} is required.`;

  if (value.trim() && field.type === 'number') {
    const number = Number(value);
    const min = field.min ?? 0;
    const step = field.step ?? 1;

    if (!Number.isFinite(number)) return 'Enter a valid number.';

    if (number < min) return `Value must be at least ${min}.`;

    if (field.max != null && number > field.max)
      return `Value must be at most ${field.max}.`;

    if (
      Math.abs((number - min) / step - Math.round((number - min) / step)) > 1e-8
    )
      return `Value must use increments of ${step}.`;
  }

  if (value && field.type === 'date' && !/^\d{4}-\d{2}-\d{2}$/.test(value))
    return 'Enter a valid date.';

  if (
    value &&
    field.type === 'time' &&
    !/^([01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/.test(value)
  )
    return 'Enter a valid time.';

  return null;
}

export function formatProfileRangeBound(value: unknown, unit?: string): string {
  if (unit === 'inches') {
    const inches = Math.round(Number(value));
    if (!Number.isFinite(inches) || inches < 0) return '--';
    return `${Math.floor(inches / 12)}' ${inches % 12}"`;
  }

  return `${value}${unit ? ` ${unit}` : ''}`;
}

export function formatProfileBirthTime(value: string): string {
  const match = /^([01]\d|2[0-3]):([0-5]\d)(?::[0-5]\d)?$/.exec(value);

  if (!match) return '--';

  const hour = Number(match[1]);
  
  return `${String(hour % 12 || 12).padStart(2, '0')}:${match[2]} ${hour >= 12 ? 'PM' : 'AM'}`;
}
