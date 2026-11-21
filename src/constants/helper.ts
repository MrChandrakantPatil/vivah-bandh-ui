type OpenToAllOption = {
  label: string;
  value: string;
};

export function addOpenToAllOption<T>(
  options: readonly T[],
): Array<T | OpenToAllOption>;

export function addOpenToAllOption<T>(
  options: Record<string, readonly T[]>,
): Array<OpenToAllOption | { label: string; options: T[] }>;

export function addOpenToAllOption<T>(
  options: readonly T[] | Record<string, readonly T[]>,
) {
  const openToAll = {
    label: 'Open to All',
    value: 'openToAll',
  };

  if (Array.isArray(options)) {
    return [openToAll, ...options];
  }

  return [
    openToAll,
    ...Object.entries(options).map(([label, values]) => ({
      label,
      options: [...values],
    })),
  ];
}
