import type { Profile } from '@/types/profile.types';
import type { ProfileState } from './types';

export type ProfileAction =
  | { type: 'PROFILE_LOADING' }
  | { type: 'SET_PROFILE'; payload: Profile }
  | { type: 'UPDATE_PROFILE'; payload: Partial<Profile> }
  | { type: 'CLEAR_PROFILE' }
  | { type: 'PROFILE_ERROR'; payload: string };

export const profileReducer = (
  state: ProfileState,
  action: ProfileAction,
): ProfileState => {
  switch (action.type) {
    case 'PROFILE_LOADING':
      return {
        ...state,
        isProfileLoading: true,
        profileError: null,
      };

    case 'SET_PROFILE':
      return {
        ...state,
        profile: action.payload,
        isProfileLoading: false,
        profileError: null,
      };

    case 'UPDATE_PROFILE':
      if (!state.profile) return state;

      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.payload,
        },
      };

    case 'PROFILE_ERROR':
      return {
        ...state,
        isProfileLoading: false,
        profileError: action.payload,
      };

    case 'CLEAR_PROFILE':
      return {
        profile: null,
        isProfileLoading: false,
        profileError: null,
      };

    default:
      return state;
  }
};
