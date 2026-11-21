import type { LucideIcon } from 'lucide-react';
import type { AnnualIncomeValue } from '@/constants/options/incomeDetails';
import type { Gender, ProfileHobby } from '@/types/profile.types';

export type PhotoItem = {
  id: string;
  key: string;
  src: string;
  name: string;
};

export interface UpdateProfilePayload {
  profileFor?: string;
  gender?: Gender;
  name?: string;
  dob?: string;
  maritalStatus?: string | null;
  height?: number | null;
  complexion?: string | null;
  disability?: string | null;
  healthInformation?: string[];
  bloodGroup?: string | null;
  religiousBackground?: {
    religion?: string | null;
    community?: string | null;
    motherTongue?: string | null;
    subCommunity?: string | null;
    gothra?: string | null;
  };
  education?: {
    highestQualification?: string | null;
    educationField?: string | null;
    collegeName?: string | null;
  };
  career?: {
    workingSector?: string | null;
    profession?: string | null;
    employer?: string | null;
    annualIncome?: string | null;
  };
  astroDetails?: {
    countryOfBirth?: string | null;
    stateOfBirth?: string | null;
    cityOfBirth?: string | null;
    timeOfBirth?: string | null;
  };
  familyDetails?: {
    financialStatus?: string | null;
    fatherDetails?: string | null;
    motherDetails?: string | null;
    brothers?: number | null;
    sisters?: number | null;
    location?: ProfileLocationUpdate;
  };
  location?: ProfileLocationUpdate;
  aboutMe?: string | null;
  hobbies?: ProfileHobby[];
  lifestyle?: { diet?: string | null };
  partnerPreferences?: {
    basicDetails?: {
      minAge?: number | null;
      maxAge?: number | null;
      minHeight?: number | null;
      maxHeight?: number | null;
      maritalStatus?: string[];
      profileWithChildren?: string | null;
    };
    religion?: {
      religion?: string[];
      community?: string[];
      subCommunity?: string[];
      motherTongue?: string[];
    };
    location?: { country?: string[]; state?: string[]; city?: string[] };
    educationAndCareer?: {
      qualification?: string[];
      workingSector?: string[];
      profession?: string[];
      annualIncome?: AnnualIncomeValue;
    };
    other?: { profileManagedBy?: string[]; diet?: string[] };
  };
  profilePhotos?: string[];
  primaryPhoto?: string;
}

interface ProfileLocationUpdate {
  country?: string | null;
  state?: string | null;
  city?: string | null;
  zip?: string | null;
}

export interface ProfileRangeValue {
  min: string;
  max: string;
}
export type ProfileFieldDraftValue =
  string | string[] | AnnualIncomeValue | ProfileRangeValue;

export interface ProfileFieldOption {
  label: string;
  value?: string;
  options?: ProfileFieldOption[];
}

export interface ProfileViewFieldConfig {
  key: string;
  label: string;
  icon: LucideIcon;
  type?: string;
  options?: ProfileFieldOption[];
  exclusiveOptionValue?: string;
  minKey?: string;
  maxKey?: string;
  suffix?: string;
  storedUnit?: 'cm';
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
}

export interface ProfileSectionGroup<Field extends ProfileViewFieldConfig> {
  key: string;
  title: string;
  icon: LucideIcon;
  fields: Field[];
}

export interface ProfileOption {
  label: string;
  value: string;
  options?: ProfileOption[];
}

export interface ProfileOptionRow {
  key: string;
  option: ProfileOption;
  isGroup: boolean;
  depth: number;
}
