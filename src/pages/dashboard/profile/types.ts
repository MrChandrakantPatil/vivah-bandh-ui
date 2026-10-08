import type { SelectOption } from '@/data/types';

type FieldType = 'text' | 'date' | 'number' | 'select';

export interface InfoField<T> {
  key: keyof T;
  label: string;
  type?: FieldType;
  options?: SelectOption[];
  getValue?: (values: T) => string | number | null | undefined;
}

export type ProfileSection =
  | 'about'
  | 'personal'
  | 'education'
  | 'family'
  | 'location'
  | 'partner'
  | 'photos';
