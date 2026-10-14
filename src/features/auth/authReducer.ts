import type { AuthAction, AuthState } from './types';

export const AuthReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
      };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };

    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };

    case 'AUTH_INITIALIZED':
      return {
        ...state,
        isInitialized: true,
        isLoading: false,
      };

    default:
      return state;
  }
};
