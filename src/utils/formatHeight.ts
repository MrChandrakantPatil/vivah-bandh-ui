export const formatHeight = (
  value: string | number | null | undefined,
  fallback = '-',
): string => {
  if (value == null || value === '') return fallback;

  return `${value} cm`;
};
