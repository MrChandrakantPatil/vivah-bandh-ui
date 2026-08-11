import { useReducer, type ReactNode } from 'react';
import { RegisterContext } from './RegisterContext';
import { initialState } from './initialState';
import { registerReducer } from './reducer';

interface RegisterProviderProps {
  children: ReactNode;
}

export function RegisterProvider({ children }: RegisterProviderProps) {
  const [state, dispatch] = useReducer(registerReducer, initialState);

  return (
    <RegisterContext.Provider value={{ state, dispatch }}>
      {children}
    </RegisterContext.Provider>
  );
}
