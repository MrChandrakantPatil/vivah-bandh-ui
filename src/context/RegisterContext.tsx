import { createContext, type Dispatch } from 'react';
import type { RegisterStateTypes } from '@/reducers/registerInitialState';
import type { RegisterActionTypes } from '@/reducers/registerReducer';

interface RegisterContextType {
  state: RegisterStateTypes;
  dispatch: Dispatch<RegisterActionTypes>;
}

const RegisterContext = createContext<RegisterContextType | null>(null);

export default RegisterContext;
