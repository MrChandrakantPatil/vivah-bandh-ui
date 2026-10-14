import { useCallback, useEffect, useReducer, type ReactNode } from 'react';

import { useAuth } from '@/features/auth';
import { getProfileApi } from '../../pages/dashboard/profile/api';
import { ProfileContext } from './ProfileContext';
import { profileReducer } from './profileReducer';
import { initialProfileState } from './initialState';
import type { Profile } from '@/types/profile.types';

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const { user, isAuthenticated, isInitialized } = useAuth();

  const [state, dispatch] = useReducer(profileReducer, initialProfileState);

  const fetchProfile = useCallback(async () => {
    dispatch({ type: 'PROFILE_LOADING' });

    try {
      const response = await getProfileApi();

      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to fetch profile');
      }

      dispatch({
        type: 'SET_PROFILE',
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: 'PROFILE_ERROR',
        payload:
          error instanceof Error ? error.message : 'Failed to fetch profile',
      });

      throw error;
    }
  }, []);

  const updateProfileData = useCallback((updates: Partial<Profile>) => {
    dispatch({
      type: 'UPDATE_PROFILE',
      payload: updates,
    });
  }, []);

  const clearProfile = useCallback(() => {
    dispatch({ type: 'CLEAR_PROFILE' });
  }, []);

  useEffect(() => {
    if (!isInitialized) {
      return;
    }

    if (!isAuthenticated || !user) {
      clearProfile();
      return;
    }

    let cancelled = false;

    const loadProfile = async () => {
      try {
        await fetchProfile();
      } catch {
        // The error is stored in ProfileContext.
      }
    };

    if (!cancelled) {
      void loadProfile();
    }

    return () => {
      cancelled = true;
    };
  }, [
    user,
    isInitialized,
    isAuthenticated,
    user?.userId,
    fetchProfile,
    clearProfile,
  ]);

  return (
    <ProfileContext.Provider
      value={{
        profile: state.profile,
        isProfileLoading: state.isProfileLoading,
        profileError: state.profileError,
        fetchProfile,
        updateProfileData,
        clearProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
