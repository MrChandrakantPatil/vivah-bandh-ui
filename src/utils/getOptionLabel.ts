import type { SelectOptionType } from '@/types/common.types';

export const getOptionLabel = (
  value: unknown,
  options: SelectOptionType[],
  fallback = 'Not specified',
): string => {
  if (value === null || value === undefined || value === '') {
    return fallback;
  }

  const getLabel = (item: unknown): string => {
    const itemValue = String(item);

    return (
      options.find((option) => option.value === itemValue)?.label ?? itemValue
    );
  };

  if (Array.isArray(value)) {
    return value.length ? value.map(getLabel).join(', ') : fallback;
  }

  return getLabel(value);
};
