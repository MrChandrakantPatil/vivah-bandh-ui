import type { AuthState } from './types';

export const initialAuthState: AuthState = {
  user: null,
  profile: null,

  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
};
