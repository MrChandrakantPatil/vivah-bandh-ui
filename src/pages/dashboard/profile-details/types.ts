export interface ProfileDetailsData {
  userId: string;
  name: string;
  profileFor?: string;
  gender?: string;
  dob?: string;
  age: number | null;

  religion?: string;
  community?: string;
  height?: number;
  color?: string;
  maritalStatus?: string;
  motherTongue?: string;

  education?: string;
  occupation?: string;
  annualIncome?: string | number;

  familyType?: string;
  familyStatus?: string;
  fatherOccupation?: string;
  motherOccupation?: string;
  brothers?: number;
  sisters?: number;

  location?: {
    city?: string | null;
    state?: string | null;
    country?: string | null;
  };

  partnerPreference?: {
    minAge?: number;
    maxAge?: number;
    minHeight?: number;
    maxHeight?: number;
    religion?: string | string[];
    community?: string | string[];
    education?: string | string[];
    occupation?: string | string[];
    maritalStatus?: string | string[];
    location?: string | string[];
    [key: string]: unknown;
  };

  profilePhotos: string[];
  primaryPhoto: string | null;
  aboutMe?: string;
  profileCompleted?: boolean;
  status?: string;

  matchPercentage: number;
}
