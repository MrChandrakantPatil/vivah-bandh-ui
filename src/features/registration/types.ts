import type { LucideIcon } from 'lucide-react';
import { profileOptions, gender } from './data';
import type { RegisterState } from '@/context/register';

export interface RegistrationModelProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface DetailCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
}

export type ProfileOptionValue = (typeof profileOptions)[number]['value'];

export type GenderOptionValue = (typeof gender)[number]['value'];

export interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export type RegistrationStep = 1 | 2 | 3 | 4 | 5;

export type RegisterField = RegisterState['formData'];
