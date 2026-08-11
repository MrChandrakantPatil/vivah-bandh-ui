export const profileOptions = [
  {
    label: 'Myself',
    value: 'myself',
    gender: null,
  },
  {
    label: 'Son',
    value: 'son',
    gender: 'male',
  },
  {
    label: 'Daughter',
    value: 'daughter',
    gender: 'female',
  },
  {
    label: 'Brother',
    value: 'brother',
    gender: 'male',
  },
  {
    label: 'Sister',
    value: 'sister',
    gender: 'female',
  },
  {
    label: 'Relative',
    value: 'relative',
    gender: null,
  },
  {
    label: 'Friend',
    value: 'friend',
    gender: null,
  },
] as const;

export const gender = [
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Female',
    value: 'female',
  },
  {
    label: 'Other',
    value: 'other',
  },
];
