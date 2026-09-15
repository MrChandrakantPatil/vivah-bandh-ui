import { useCallback, useEffect, useReducer, type ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { AuthReducer } from './authReducer';
import { initialAuthState } from './initialState';

import {
  getCurrentUserApi,
  getProfileApi,
  loginApi,
  logoutApi,
  refreshTokenApi,
} from './authService';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(AuthReducer, initialAuthState);

  const fetchProfile = useCallback(async () => {
    const response = await getProfileApi();

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to fetch profile');
    }

    dispatch({
      type: 'SET_PROFILE',
      payload: response.data,
    });
  }, []);

  const login = useCallback(
    async (username: string, password: string) => {
      try {
        dispatch({
          type: 'AUTH_START',
        });

        const response = await loginApi({
          username,
          password,
        });

        if (!response.success || !response.data) {
          throw new Error(response.message || 'Login failed');
        }

        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: response.data,
        });

        await fetchProfile();
      } catch (error) {
        dispatch({
          type: 'AUTH_FAILURE',
        });

        throw error;
      }
    },
    [fetchProfile],
  );

  const refreshAuth = useCallback(async () => {
    try {
      let userResponse;

      try {
        userResponse = await getCurrentUserApi();
      } catch {
        const refreshResponse = await refreshTokenApi();

        if (!refreshResponse.success) {
          throw new Error(refreshResponse.message || 'Session expired');
        }

        userResponse = await getCurrentUserApi();
      }

      if (!userResponse.success || !userResponse.data) {
        throw new Error(userResponse.message || 'Authentication failed');
      }

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: userResponse.data,
      });

      await fetchProfile();
    } catch {
      dispatch({
        type: 'AUTH_FAILURE',
      });
    } finally {
      dispatch({
        type: 'AUTH_INITIALIZED',
      });
    }
  }, [fetchProfile]);

  const logout = useCallback(async () => {
    try {
      await logoutApi();
    } finally {
      dispatch({
        type: 'LOGOUT',
      });
    }
  }, []);

  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        profile: state.profile,

        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
        isInitialized: state.isInitialized,

        login,
        logout,
        refreshAuth,
        fetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
