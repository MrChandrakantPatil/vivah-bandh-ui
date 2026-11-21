import type { ProfileHobby } from '@/types/profile.types';

export function getHobbyValues(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return [
    ...new Set(
      value.flatMap((item) => {
        if (typeof item === 'string') return [item];

        if (item && typeof item === 'object' && typeof item.value === 'string')
          return [item.value];

        return [];
      }),
    ),
  ];
}

export function buildHobbiesPayload(
  values: string[],
  groups: Record<string, { value: string }[]>,
): ProfileHobby[] {
  return [...new Set(values)].map((value) => {
    const category = Object.keys(groups).find((key) =>
      groups[key].some((option) => option.value === value),
    );

    if (!category)
      throw new Error(`Unknown hobby: ${value}. Please select a listed hobby.`);
    
    return { category, value };
  });
}
