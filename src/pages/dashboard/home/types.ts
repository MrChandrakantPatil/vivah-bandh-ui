import { type LucideIcon } from 'lucide-react';

export interface CardProp {
  title: string;
  count: number;
  growth: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  growthColor: string;
}

export type ActivityTypeValue =
  'profile_like' | 'profile_view' | 'interest_received' | 'message_received';

export type Activity = {
  id: string;
  type: ActivityTypeValue;
  actor: {
    id: string;
    name: string;
  };
  createdAt: string;
};
