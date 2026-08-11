import type {
  ButtonHTMLAttributes,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import { type LucideIcon } from 'lucide-react';

export interface AvatarProp {
  name: string;
  image?: string;
  className?: string;
}

export interface HeaderIconPropTypes extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  count?: number;
}

export interface DashboardHeaderPropTypes {
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
  isCollapsed: boolean;
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
}

export interface DashboardSidebarProp {
  isSidebarOpen: boolean;
  isCollapsed: boolean;
}

export interface TooltipState {
  label: string;
  left: number;
  top: number;
}

export interface NotificationBadgeProp {
  count: number;
  className?: string;
}

export type ProfileMenuVariant = 'default' | 'premium' | 'danger';
export type ProfileMenuAction = 'logout';

export interface ProfileMenu {
  id: string;
  label?: string;
  icon?: LucideIcon;
  rightIcon?: LucideIcon;
  variant?: ProfileMenuVariant;
  divider?: boolean;
  path?: string;
  action?: ProfileMenuAction;
}

export interface MenuItemProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: LucideIcon;
  rightIcon?: LucideIcon;
  variant?: ProfileMenuVariant;
}

export interface SidebarTooltipPosition {
  left: number;
  top: number;
}

export interface SidebarTooltipProp {
  visible: boolean;
  label?: string;
  position: SidebarTooltipPosition | null;
}

export interface SidebarMenu {
  id: number;
  label: string;
  icon: LucideIcon;
  path: string;
  badge?: number;
}
