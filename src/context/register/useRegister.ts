import { useContext } from 'react';
import { RegisterContext } from './RegisterContext';

export function useRegister() {
  const context = useContext(RegisterContext);

  if (!context) {
    throw new Error('useRegister must be used inside RegisterProvider');
  }

  return context;
}
