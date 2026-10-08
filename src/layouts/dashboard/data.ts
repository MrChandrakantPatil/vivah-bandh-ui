import {
  LayoutDashboard,
  Heart,
  Settings,
  User,
  CircleQuestionMark,
} from 'lucide-react';
import type { SidebarMenu } from './types';

export const sidebarMenu: SidebarMenu[] = [
  {
    id: 1,
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard',
  },
  {
    id: 2,
    label: 'Matches',
    icon: Heart,
    path: '/matches',
    badge: 0,
  },
  {
    id: 9,
    label: 'My Profile',
    icon: User,
    path: '/profile',
  },
  {
    id: 11,
    label: 'Settings',
    icon: Settings,
    path: '/settings',
  },
  {
    id: 12,
    label: 'Help & Support',
    icon: CircleQuestionMark,
    path: '/help-and-support',
  },
];
