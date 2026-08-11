import { useNavigate } from 'react-router-dom';
import {
  User,
  Settings,
  BadgeCheck,
  HeartHandshake,
  HelpCircle,
  LogOut,
  Crown,
} from 'lucide-react';
import { Avatar } from './Avatar';
import type { ProfileMenuVariant, ProfileMenu, MenuItemProp } from '../types';

const profileMenus: ProfileMenu[] = [
  {
    id: 'profile',
    label: 'My Profile',
    icon: User,
    path: '/dashboard/profile',
  },
  {
    id: 'settings',
    label: 'Account Settings',
    icon: Settings,
    path: '/dashboard/settings',
  },
  {
    id: 'membership',
    label: 'Upgrade Membership',
    icon: HeartHandshake,
    rightIcon: Crown,
    variant: 'premium',
    path: '/membership/upgrade',
  },
  {
    id: 'details',
    label: 'Membership Details',
    icon: BadgeCheck,
    path: '/membership/details',
  },
  {
    id: 'support',
    label: 'Help & Support',
    icon: HelpCircle,
    path: '/support',
  },
  {
    id: 'divider',
    divider: true,
  },
  {
    id: 'logout',
    label: 'Logout',
    icon: LogOut,
    variant: 'danger',
    action: 'logout',
  },
];

function MenuItem({
  label,
  icon: Icon,
  rightIcon: RightIcon,
  variant = 'default',
  ...props
}: MenuItemProp) {
  const variantClasses: Record<
    ProfileMenuVariant,
    {
      icon: string;
      text: string;
    }
  > = {
    default: {
      icon: 'text-gray-500',
      text: 'text-gray-700',
    },
    premium: {
      icon: 'text-pink-500',
      text: 'text-pink-500',
    },
    danger: {
      icon: 'text-red-500',
      text: 'text-red-500',
    },
  };

  const { icon: iconClass, text: textClass } = variantClasses[variant];

  return (
    <button
      className="w-full flex items-center justify-between p-3.5 rounded-xl hover:bg-pink-100 transition-colors"
      {...props}
    >
      <div className="flex items-center gap-3">
        {Icon && (
          <div className={iconClass}>
            <Icon size={24} />
          </div>
        )}

        <span className={`font-medium text-base ${textClass}`}>{label}</span>
      </div>

      {RightIcon && (
        <RightIcon size={22} className="fill-amber-400 text-amber-500" />
      )}
    </button>
  );
}

export function ProfileCard() {
  const navigate = useNavigate();

  const handleClick = ({ action, path }: ProfileMenu) => {
    if (action === 'logout') {
      // logout logic
      return;
    }

    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="absolute top-full -right-4 left-auto lg:-right-6 mt-3 z-50">
      <div className="absolute -top-2 right-5 sm:right-6 lg:right-8.5 w-4 h-4 bg-pink-300 border-l border-t border-gray-200 rotate-45 z-10" />

      <div className="w-75 h-auto md:w-80 bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-2xl overflow-hidden">
        <div className="bg-pink-300 px-4 sm:px-6 py-6">
          <div className="flex items-center gap-4">
            <Avatar
              name="Chandrakant Patil"
              className="w-14 h-14 sm:w-16 sm:h-16 border-2 border-white shadow-md text-3xl bg-slate-500"
            />

            <div className="flex-1 min-w-0">
              <h3 className="text-xl sm:text-xl font-semibold truncate text-slate-700">
                Chandrakant Patil
              </h3>

              <div className="mt-1 flex items-center gap-2 text-amber-700">
                <Crown size={18} className="fill-amber-400" />

                <span className="text-sm sm:text-sm font-medium">
                  Premium Member
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-t-[28px] bg-white px-3 sm:px-4 py-3">
          {profileMenus.map((item) => {
            if (item.divider) {
              return (
                <div key={item.id} className="my-2 border-t border-gray-300" />
              );
            }

            return (
              <MenuItem
                key={item.id}
                {...item}
                onClick={() => handleClick(item)}
                aria-label={item.label}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
