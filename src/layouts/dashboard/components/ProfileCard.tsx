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
      className="
        flex items-center justify-between
        w-full p-3.5
        rounded-xl
        transition-colors
        hover:bg-pink-100
      "
      {...props}
    >
      <div className="flex items-center gap-3">
        {Icon && (
          <div className={iconClass}>
            <Icon size={24} />
          </div>
        )}

        <span
          className={`
            font-medium text-base
            ${textClass}
          `}
        >
          {label}
        </span>
      </div>

      {RightIcon && (
        <RightIcon size={22} className="text-amber-500 fill-amber-400" />
      )}
    </button>
  );
}

interface ProfileCardProps {
  onLogout: () => void;
}

export function ProfileCard({ 
  onLogout 
}: ProfileCardProps) {
  const navigate = useNavigate();

  const handleClick = ({ action, path }: ProfileMenu) => {
    if (action === 'logout') {
      onLogout();
      return;
    }

    if (path) {
      navigate(path);
    }
  };

  return (
    <div
      className="
        absolute top-full left-auto z-50 -right-4
        mt-3
        lg:-right-6
      "
    >
      <div
        className="
          absolute right-5 z-10 -top-2
          w-4 h-4
          bg-pink-300 border-l border-t border-gray-200
          sm:right-6 lg:right-8.5
          rotate-45
        "
      />

      <div
        className="
          w-75 h-auto
          bg-white shadow-2xl rounded-lg border border-gray-200
          overflow-hidden
          md:w-80 sm:rounded-xl
        "
      >
        <div className="px-4 py-6 bg-pink-300 sm:px-6">
          <div className="flex items-center gap-4">
            <Avatar
              name="Chandrakant Patil"
              className="
                w-14 h-14
                bg-slate-500 shadow-md border-2 border-white
                text-3xl
                sm:w-16 sm:h-16
              "
            />

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-700 text-xl truncate sm:text-xl">
                Chandrakant Patil
              </h3>

              <div className="flex items-center gap-2 mt-1 text-amber-700">
                <Crown size={18} className="fill-amber-400" />

                <span className="font-medium text-sm sm:text-sm">
                  Premium Member
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-3 py-3 bg-white rounded-t-[28px] sm:px-4">
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
