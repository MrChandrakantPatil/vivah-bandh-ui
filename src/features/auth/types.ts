export type UserRole = 'user' | 'admin';

export interface User {
  userId: string;
  email: string;
  mobile: string;
  role: UserRole;
}

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

  location: Location;

  partnerPreference: PartnerPreference;

  profilePhoto: string | null;

  aboutMe: string | null;

  profileCompleted: boolean;

  status: 'draft' | 'active' | 'inactive';
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface AuthState {
  user: User | null;

  profile: Profile | null;

  isAuthenticated: boolean;

  isLoading: boolean;

  isInitialized: boolean;
}

export type AuthAction =
  | {
      type: 'AUTH_START';
    }
  | {
      type: 'LOGIN_SUCCESS';
      payload: User;
    }
  | {
      type: 'AUTH_SUCCESS';
    }
  | {
      type: 'SET_PROFILE';
      payload: Profile;
    }
  | {
      type: 'AUTH_FAILURE';
    }
  | {
      type: 'LOGOUT';
    }
  | {
      type: 'AUTH_INITIALIZED';
    };
