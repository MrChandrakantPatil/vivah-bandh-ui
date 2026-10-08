import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  MessageCircleMore,
  Bell,
  Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  Crown,
} from 'lucide-react';
import { NotificationBadge } from './NotificationBadge';
import { Avatar } from './Avatar';
import { ProfileCard } from './ProfileCard';
import { useHandleOutsideClick } from '@/hooks/useHandleOutsideClick';
import { useAuth } from '@/features/auth';
import type { HeaderIconPropTypes, DashboardHeaderPropTypes } from '../types';
import { logo, logoIcon } from '@/assets/images';

function HeaderIcon({ children, count = 0, ...props }: HeaderIconPropTypes) {
  return (
    <button
      className="
        relative
        flex items-center justify-center
        w-5 h-5
        text-slate-600
        hover:text-slate-800
        sm:w-6 lg:w-7 sm:h-6 lg:h-7
      "
      {...props}
    >
      {children}

      {!!count && (
        <NotificationBadge
          count={count}
          className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2"
        />
      )}
    </button>
  );
}

export function DashboardHeader({
  setIsSidebarOpen,
  isCollapsed,
  setIsCollapsed,
}: DashboardHeaderPropTypes) {
  const [showSearch, setShowSearch] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const profileRef = useRef<HTMLDivElement | null>(null);

  const { logout, user, profile } = useAuth();

  const image = profile?.profilePhotos?.[1];

  console.log(profile);

  const navigate = useNavigate();

  useHandleOutsideClick(profileRef, () => {
    setShowProfileMenu(false);
  });

  const handleLogout = async () => {
    try {
      await logout();

      navigate('/login', {
        replace: true,
      });
    } catch (error) {
      console.error('Logout API failed:', error);
    } finally {
      navigate('/login', {
        replace: true,
      });
    }
  };

  return (
    <header
      className="
        sticky top-0 z-30
        h-21.25 min-h-21.25
        bg-white/95 border-b border-gray-200
        md:h-21.25 md:min-h-21.25
        backdrop-blur-md
      "
    >
      <div
        className="
          flex items-center justify-between
          h-full px-4
          sm:px-8 md:px-8 lg:px-10
        "
      >
        {showSearch ? (
          <div className="flex items-center gap-2 w-full">
            <button
              onClick={() => setShowSearch(false)}
              className="
                flex items-center justify-center
                w-9 h-9
                rounded-full
                hover:bg-gray-100
              "
            >
              <X size={20} />
            </button>

            <div
              className="
                flex flex-1 items-center
                px-3 py-2
                bg-gray-50 rounded-lg border border-gray-300
              "
            >
              <Search size={18} className="text-gray-500" />

              <input
                autoFocus
                type="text"
                placeholder="Search profiles..."
                className="flex-1 ml-2 bg-transparent text-gray-700 text-sm outline-none"
              />
            </div>
          </div>
        ) : (
          <>
            {/* Left Section */}
            <div className="flex items-center gap-3">
              {/* Common Sidebar Button */}
              <button
                onClick={() => {
                  if (window.innerWidth >= 768) {
                    setIsCollapsed((prev) => !prev);
                  } else {
                    setIsSidebarOpen(true);
                  }
                }}
                className="
                  flex items-center justify-center
                  rounded-full
                  text-gray-600
                  transition-all duration-200
                  hover:bg-gray-100
                "
              >
                {/* Mobile */}
                <Menu className="md:hidden" size={22} />

                {/* Desktop */}
                <div className="md:flex hidden">
                  {isCollapsed ? (
                    <PanelLeftOpen size={24} />
                  ) : (
                    <PanelLeftClose size={24} />
                  )}
                </div>
              </button>

              {/* Mobile Logo */}
              <div className="flex w-full max-w-50 md:hidden">
                <img
                  src={logo}
                  alt="Vivah Bandh"
                  className="w-full h-auto sm:block hidden"
                />

                <img
                  src={logoIcon}
                  alt="Vivah Bandh"
                  className="w-10 h-10 sm:hidden object-contain"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4 lg:gap-5">
              <button
                type="button"
                className="
                  flex items-center justify-center
                  w-7 h-7 p-0
                  bg-[#e21c56] rounded-full border border-[#e21c56]
                  md:w-auto md:h-auto md:px-4 md:py-2 md:bg-[#fdf6f7] md:rounded-md md:border-[#fcb4ca]
                "
              >
                <Crown
                  size={16}
                  className="text-white md:text-[#feac09] md:fill-[#feac09] fill-white"
                />

                <span className="ml-2 font-bold text-[#e21c56] text-xs md:inline hidden">
                  Upgrade to Premium
                </span>
              </button>

              <div className="w-px h-7 bg-gray-200" />

              <HeaderIcon
                aria-label="Search"
                onClick={() => setShowSearch(true)}
              >
                <Search className="w-full h-full" />
              </HeaderIcon>

              <HeaderIcon aria-label="Messages" count={0}>
                <MessageCircleMore className="w-full h-full" />
              </HeaderIcon>

              <HeaderIcon aria-label="Notifications" count={0}>
                <Bell className="w-full h-full" />
              </HeaderIcon>

              <div ref={profileRef} className="relative">
                <button onClick={() => setShowProfileMenu((prev) => !prev)}>
                  <Avatar
                    name={profile?.name || user?.email || 'User'}
                    image={image}
                    className="w-6 h-6 text-lg md:w-9 md:h-9 md:text-xl"
                  />
                </button>

                {showProfileMenu && <ProfileCard onLogout={handleLogout} />}
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
