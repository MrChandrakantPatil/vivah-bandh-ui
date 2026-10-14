import { createContext } from 'react';
import type { Profile } from '@/types/profile.types';

export interface ProfileContextType {
  profile: Profile | null;
  isProfileLoading: boolean;
  profileError: string | null;
  fetchProfile: () => Promise<void>;
  updateProfileData: (updates: Partial<Profile>) => void;
  clearProfile: () => void;
}

export const ProfileContext = createContext<ProfileContextType | null>(null);
