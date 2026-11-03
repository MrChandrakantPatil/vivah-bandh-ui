import type { Profile } from '@/types/profile.types';

export interface ProfileState {
  profile: Profile | null;
  isProfileLoading: boolean;
  profileError: string | null;
}
