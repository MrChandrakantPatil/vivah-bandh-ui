import {
  useState,
  useRef,
  type ButtonHTMLAttributes,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from 'react';
import {
  Search,
  MessageCircleMore,
  Bell,
  Menu,
  X,
  Heart,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import { NotificationBadge } from './NotificationBadge';
import { Avatar } from './Avatar';
import { ProfileCard } from './ProfileCard';

import { useHandleOutsideClick } from '@/hooks/useHandleOutsideClick';

interface HeaderIconPropTypes extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  count?: number;
}

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

interface DashboardHeaderPropTypes {
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
  isCollapsed: boolean;
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
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
    <header className="sticky top-0 z-30 h-16 md:h-21.25 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
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
              <div className="flex items-center gap-2 md:hidden">
                <Heart className="w-7 h-7 text-[#e13060]" />

                <span className="hidden sm:block font-serif text-xl font-bold text-[#e13060]">
                  Vivah Bandh
                </span>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4 lg:gap-5">
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
