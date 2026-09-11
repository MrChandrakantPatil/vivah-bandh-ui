import {
  male1,
  male2,
  male3,
  male4,
  male5,
  female1,
  female2,
  female3,
  female4,
  female5,
} from '@/assets/images';

export const profileImages = {
  male1,
  male2,
  male3,
  male4,
  male5,
  female1,
  female2,
  female3,
  female4,
  female5,
} as const;

import type { Paginations } from '@/components/Pagination/types';

export type ProfileImageName = keyof typeof profileImages;

export type TabId = 'recommendedMatches' | 'newMatches' | 'shortlistedMatches';
// | 'interestedMatches'
// | 'viewedMatches';

export interface Tabs {
  id: TabId;
  label: string;
  count: number;
}

export interface Location {
  city: string;
  state: string;
  country: string;
}

export interface MatchProfile {
  userId: string;
  name: string;
  age: number;
  height: number;
  religion: string;
  community: string;
  maritalStatus: string;
  profilePhotos: ProfileImageName[];
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

export interface MatchesResponse {
  success: boolean;
  message: string;
  data: {
    matches: MatchProfile[];
    pagination: Paginations;
  };
}
