import { useReducer, type ReactNode } from 'react';

import RegisterContext from './RegisterContext';
import { registerInitialState } from '@/reducers/registerInitialState';
import { registerReducer } from '@/reducers/registerReducer';

interface RegisterProviderProps {
  children: ReactNode;
}

export function RegisterProvider({ children }: RegisterProviderProps) {
  const [state, dispatch] = useReducer(registerReducer, registerInitialState);

  return (
    <RegisterContext.Provider value={{ state, dispatch }}>
      {children}
    </RegisterContext.Provider>
  );
}
