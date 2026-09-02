import { createContext } from 'react';
import type { Profile, User } from './types';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;

  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;

  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
  fetchProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
