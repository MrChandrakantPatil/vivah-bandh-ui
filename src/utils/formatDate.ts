export const formatDate = (
  value: string | number | Date | null | undefined,
  fallback = '-',
): string => {
  if (value == null || value === '') return fallback;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return fallback;

  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};
