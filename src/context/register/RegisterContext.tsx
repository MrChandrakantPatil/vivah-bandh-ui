import { createContext } from 'react';
import { type RegisterContextValue } from './types';

export const RegisterContext = createContext<RegisterContextValue | null>(null);
