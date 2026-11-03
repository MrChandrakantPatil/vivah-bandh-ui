export type UserRole = 'user' | 'admin';

export interface User {
  userId: string;
  email: string;
  mobile: string;
  role: UserRole;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
}
