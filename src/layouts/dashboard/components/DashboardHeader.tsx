import { useState, useRef } from 'react';
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
import type { HeaderIconPropTypes, DashboardHeaderPropTypes } from '../types';
import { logo, logoIcon } from '@/assets/images';

function HeaderIcon({ children, count = 0, ...props }: HeaderIconPropTypes) {
  return (
    <button
      className="relative flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-slate-600 hover:text-slate-800"
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

  useHandleOutsideClick(profileRef, () => {
    setShowProfileMenu(false);
  });

  return (
    <header className="sticky top-0 z-30 h-16 md:h-21.25 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="flex items-center justify-between h-full px-4 sm:px-8 md:px-8 lg:px-10">
        {showSearch ? (
          <div className="flex items-center w-full gap-2">
            <button
              onClick={() => setShowSearch(false)}
              className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100"
            >
              <X size={20} />
            </button>

            <div className="flex items-center flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
              <Search size={18} className="text-gray-500" />

              <input
                autoFocus
                type="text"
                placeholder="Search profiles..."
                className="flex-1 ml-2 text-sm bg-transparent outline-none text-gray-700"
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
                className="flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 transition-all duration-200"
              >
                {/* Mobile */}
                <Menu className="md:hidden" size={22} />

                {/* Desktop */}
                <div className="hidden md:flex">
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
                  className="hidden sm:block w-full h-auto"
                />

                <img
                  src={logoIcon}
                  alt="Vivah Bandh"
                  className="sm:hidden w-10 h-10 object-contain"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4 lg:gap-5">
              <button
                type="button"
                className="
                  flex items-center justify-center w-7 h-7 
                  p-0 bg-[#e21c56] border border-[#e21c56] rounded-full
                  md:w-auto md:h-auto md:px-4 md:py-2 md:border-[#fcb4ca] md:rounded-md md:bg-[#fdf6f7]
                "
              >
                <Crown
                  size={16}
                  className="fill-white text-white md:fill-[#feac09] md:text-[#feac09]"
                />

                <span className="hidden md:inline ml-2 text-[#e21c56] font-bold text-xs">
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

              <HeaderIcon aria-label="Messages" count={5}>
                <MessageCircleMore className="w-full h-full" />
              </HeaderIcon>

              <HeaderIcon aria-label="Notifications" count={35}>
                <Bell className="w-full h-full" />
              </HeaderIcon>

              <div ref={profileRef} className="relative">
                <button onClick={() => setShowProfileMenu((prev) => !prev)}>
                  <Avatar
                    name="Chandrakant Patil"
                    className="w-6 h-6 text-lg md:w-9 md:h-9 md:text-xl"
                  />
                </button>

                {showProfileMenu && <ProfileCard />}
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
