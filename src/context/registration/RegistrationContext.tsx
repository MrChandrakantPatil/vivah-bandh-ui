import { createContext } from 'react';
import { type RegistrationContextValue } from './types';

export const RegistrationContext =
  createContext<RegistrationContextValue | null>(null);
