import { type LucideIcon } from 'lucide-react';

export interface SelectOption {
  label: string;
  value: string;
}

export type MoreFilterOption = {
  key: string;
  title: string;
  icon: LucideIcon;
  options: SelectOption[];
};
