import { useCallback, useEffect, useReducer, type ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { AuthReducer } from './authReducer';
import { initialAuthState } from './initialState';

import { getCurrentUserApi, loginApi, logoutApi } from './authService';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(AuthReducer, initialAuthState);

  const login = useCallback(async (username: string, password: string) => {
    try {
      dispatch({ type: 'AUTH_START' });

      const response = await loginApi({ username, password });

      if (!response.success || !response.data) {
        throw new Error(response.message || 'Login failed');
      }

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data,
      });
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE' });
      throw error;
    }
  }, []);

  const refreshAuth = useCallback(async () => {
    try {
      const response = await getCurrentUserApi();

      if (!response.success || !response.data) {
        throw new Error(response.message || 'Authentication failed');
      }

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data,
      });
    } catch {
      dispatch({ type: 'AUTH_FAILURE' });
    } finally {
      dispatch({ type: 'AUTH_INITIALIZED' });
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutApi();
    } finally {
      dispatch({ type: 'LOGOUT' });
    }
  }, []);

  // Handle a refresh failure that occurs during normal API usage.
  useEffect(() => {
    const handleSessionExpired = () => {
      dispatch({ type: 'AUTH_FAILURE' });
    };

    window.addEventListener('auth:session-expired', handleSessionExpired);

    return () => {
      window.removeEventListener('auth:session-expired', handleSessionExpired);
    };
  }, []);

  // Restore the session when the application starts.
  useEffect(() => {
    void refreshAuth();
  }, [refreshAuth]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
        isInitialized: state.isInitialized,
        login,
        logout,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
