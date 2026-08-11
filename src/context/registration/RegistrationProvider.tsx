import { useReducer, type ReactNode } from 'react';
import { RegistrationContext } from './RegistrationContext';
import { initialState } from './initialState';
import { registrationReducer } from './reducer';

interface RegistrationProviderProps {
  children: ReactNode;
}

export function RegistrationProvider({ children }: RegistrationProviderProps) {
  const [state, dispatch] = useReducer(registrationReducer, initialState);

  return (
    <RegistrationContext.Provider value={{ state, dispatch }}>
      {children}
    </RegistrationContext.Provider>
  );
}
