import type { SelectOption } from '@/data/types';
import type { Gender } from '@/types/profile.types';

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
  | 'photos'
  | 'partner';

export interface UpdateProfilePayload {
  profileFor?: string;
  gender?: Gender;
  name?: string;
  dob?: string;
  maritalStatus?: string | null;
  religion?: string;
  community?: string;
  motherTongue?: string | null;
  height?: number | null;
  color?: string | null;
  education?: string | null;
  occupation?: string | null;
  annualIncome?: string | null;
  familyType?: string | null;
  familyStatus?: string | null;
  fatherOccupation?: string | null;
  motherOccupation?: string | null;
  brothers?: number | null;
  sisters?: number | null;
  location?: {
    country?: string | null;
    state?: string | null;
    city?: string | null;
  };
  aboutMe?: string | null;
  hobbies?: string[];
  lifestyle?: string | null;
  partnerPreference?: {
    minAge?: number | null;
    maxAge?: number | null;
    religion?: string[];
    community?: string[];
    education?: string[];
    occupation?: string[];
  };
  profilePhotos?: string[];
  primaryPhoto?: string;
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data: UpdateProfilePayload;
}
