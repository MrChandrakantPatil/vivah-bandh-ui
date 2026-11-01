export type RegistrationStep = 1 | 2 | 3 | 4 | 5;

export type ProfileForOption =
  'self' |
  'son' |
  'daughter' |
  'brother' |
  'sister' |
  'relative' |
  'friend';

export type Gender = 'male' | 'female';


export interface Location {
  country: string | null;
  state: string | null;
  city: string | null;
}

export interface PartnerPreference {
  minAge: number | null;
  maxAge: number | null;
  religion: string[];
  community: string[];
  education: string[];
  occupation: string[];
}

export interface Profile {
  userId: string;
  profileFor: string;
  gender: Gender;
  name: string;
  dob: string;
  age: number | string;
  religion: string | null;
  community: string | null;
  height: number | null;
  color: string | null;
  maritalStatus: string | null;
  motherTongue: string | null;
  education: string | null;
  occupation: string | null;
  annualIncome: string | null;
  familyType: string | null;
  familyStatus: string | null;
  fatherOccupation: string | null;
  motherOccupation: string | null;
  brothers: number | null;
  sisters: number | null;
  location: Location;
  partnerPreference: PartnerPreference | null;
  profilePhotos: string[] | null;
  primaryPhoto: string | null;
  aboutMe: string | null;
  hobbies: string[] | null;
  lifestyle: string | null;
  profileCompleted: boolean;
  profilePercentage: number | null;
  status:
    'draft' | 'active' | 'hidden' | 'under_review' | 'rejected' | 'inactive';
}

export interface MatchProfile {
  userId: string;
  name: string;
  age: number;
  height: number;
  religion: string;
  community: string;
  maritalStatus: string;
  profilePhotos: string[] | null;
  occupation: string;
  education: string;
  location: Location;
  familyType: string;
  hobbies: string;
  annualIncome: string;
  lifestyle: string;
  matchPercentage: number;
  isShortlisted: boolean;
}