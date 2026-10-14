import type { Profile } from '@/types/profile.types';

export interface ProfileState {
  profile: Profile | null;
  isProfileLoading: boolean;
  profileError: string | null;
}

export type ProfileAction =
  | { type: 'PROFILE_LOADING' }
  | { type: 'SET_PROFILE'; payload: Profile }
  | { type: 'UPDATE_PROFILE'; payload: Partial<Profile> }
  | { type: 'CLEAR_PROFILE' }
  | { type: 'PROFILE_ERROR'; payload: string };
