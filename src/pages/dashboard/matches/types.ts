import type { Paginations } from '@/components/Pagination/types';

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

export interface MatchesResponse {
  success: boolean;
  message: string;
  data: {
    matches: MatchProfile[];
    pagination: Paginations;
  };
}
