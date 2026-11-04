import { useState, useRef } from 'react';
import type {
  ButtonHTMLAttributes,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, MessageCircleMore, Bell, Menu, X } from 'lucide-react';
import { NotificationBadge } from './NotificationBadge';
import { Avatar } from './Avatar';
import { UserDropdown } from './UserDropdown';
import { useHandleOutsideClick } from '@/hooks/useHandleOutsideClick';
import { useAuth } from '@/features/auth';
import { useProfile } from '@/features/profile';
import { getCdnUrl } from '@/utils/getCdnUrl';
import { logo, logoIcon } from '@/assets/images';

export interface HeaderIconPropTypes extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  count?: number;
}

export interface DashboardHeaderPropTypes {
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
  isCollapsed: boolean;
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
}

function HeaderIcon({
  children,
  count = 0,
  className = '',
  ...props
}: HeaderIconPropTypes) {
  return (
    <button
      type="button"
      className={`
        relative
        flex items-center justify-center shrink-0
        w-9 h-9
        bg-[#fff0f4] rounded-full
        text-[#e21c56]
        transition-all duration-200
        hover:bg-[#ffe3eb]
        sm:w-10 sm:h-10
        ${className}
      `}
      {...props}
    >
      {children}

      {!!count && (
        <NotificationBadge count={count} className="absolute -top-1 -right-1" />
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

  const { logout, user } = useAuth();
  const { profile } = useProfile();

  const navigate = useNavigate();

  const imageKey = profile?.primaryPhoto ?? profile?.profilePhotos?.[0] ?? null;

  const image = imageKey ? getCdnUrl(imageKey) : '';

  useHandleOutsideClick(profileRef, () => {
    setShowProfileMenu(false);
  });

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout API failed:', error);
    } finally {
      navigate('/login', {
        replace: true,
      });
    }
  };

  const handleSidebarToggle = () => {
    if (window.innerWidth >= 768) {
      setIsCollapsed((prev) => !prev);
    } else {
      setIsSidebarOpen((prev) => !prev);
    }
  };

  return (
    <header
      className="
        relative z-60
        flex items-center shrink-0
        w-full h-18 min-h-18
        bg-white shadow-[0_3px_10px_rgba(15,23,42,0.08)] border-b border-slate-200
      "
    >
      <div
        className="
          flex items-center justify-between gap-3
          w-full h-full px-5
          md:px-0
        "
      >
        {showSearch ? (
          <div className="flex items-center gap-3 w-full">
            <button
              type="button"
              onClick={() => setShowSearch(false)}
              aria-label="Close search"
              className="
                flex items-center justify-center shrink-0
                w-9 h-9
                rounded-full
                text-slate-600
                hover:bg-gray-100
              "
            >
              <X size={20} />
            </button>

            <div
              className="
                flex flex-1 items-center
                px-3 py-2.5
                bg-[#fff5f7] rounded-xl border border-pink-100
              "
            >
              <Search size={18} className="text-slate-400" />

              <input
                autoFocus
                type="text"
                placeholder="Search profiles..."
                className="
                  flex-1
                  min-w-0 ml-2
                  bg-transparent
                  text-slate-700 placeholder:text-slate-400 text-sm
                  outline-none
                "
              />
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-1 items-center min-w-0 h-full">
              <div
                className="
                  flex items-center justify-center shrink-0
                  w-6.25 max-w-6.25 min-w-6.25 h-full
                  md:w-19.5 md:max-w-20 md:min-w-19.5
                "
              >
                <button
                  type="button"
                  aria-label={
                    isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
                  }
                  onClick={handleSidebarToggle}
                  className="
                    flex items-center justify-center
                    w-auto h-auto p-0
                    rounded-none
                    text-slate-600
                    transition-all duration-200
                    hover:bg-transparent
                    md:w-10 md:h-10 md:hover:bg-slate-100 md:rounded-lg
                  "
                >
                  <Menu size={25} strokeWidth={1.8} />
                </button>
              </div>

              <div
                className={`
                  items-center shrink-0
                  h-full
                  transition-[width] duration-300 ease-in-out
                  overflow-hidden
                  md:flex
                  hidden
                  ${isCollapsed ? 'w-6.25' : 'w-0'}
                `}
              >
                <div
                  className={`
                    shrink-0
                    w-px h-12
                    bg-linear-to-b
                    transition-opacity duration-300
                    from-transparent via-slate-300 to-transparent
                    ${isCollapsed ? 'opacity-100' : 'opacity-0'}
                  `}
                />
              </div>

              <Link
                to="/"
                aria-label="Vivah Bandh home"
                className="flex items-center shrink-0 ml-3 md:ml-0"
              >
                <img
                  src={logo}
                  alt="Vivah Bandh"
                  className="w-52 h-auto sm:block hidden object-contain"
                />

                <img
                  src={logoIcon}
                  alt="Vivah Bandh"
                  className="w-10 h-10 sm:hidden object-contain"
                />
              </Link>
            </div>

            <div
              className="
                flex items-center gap-1.5 shrink-0
                px-0
                sm:gap-3 lg:gap-4 md:px-6 lg:px-5
              "
            >
              <HeaderIcon
                aria-label="Search"
                className="md:hidden"
                onClick={() => setShowSearch(true)}
              >
                <Search size={20} strokeWidth={1.8} />
              </HeaderIcon>

              <HeaderIcon aria-label="Search" className="md:flex hidden">
                <Search size={23} strokeWidth={1.8} />
              </HeaderIcon>

              <HeaderIcon aria-label="Messages" count={0}>
                <MessageCircleMore
                  size={20}
                  className="sm:w-5.75 sm:h-5.75"
                  strokeWidth={1.8}
                />
              </HeaderIcon>

              <HeaderIcon aria-label="Notifications" count={0}>
                <Bell
                  size={20}
                  className="sm:w-5.75 sm:h-5.75"
                  strokeWidth={1.8}
                />
              </HeaderIcon>

              <div ref={profileRef} className="relative ml-0.5 sm:ml-1">
                <button
                  type="button"
                  aria-label="Toggle profile menu"
                  aria-expanded={showProfileMenu}
                  onClick={() => setShowProfileMenu((prev) => !prev)}
                  className="
                    flex items-center justify-center
                    w-9 h-9
                    bg-[#fde8ee] rounded-full
                    transition
                    hover:ring-pink-200
                    sm:w-10 sm:h-10
                    ring-2 ring-transparent
                  "
                >
                  <Avatar
                    name={profile?.name || user?.email || 'User'}
                    image={image}
                    className="w-9 h-9 text-lg sm:w-10 sm:h-10 sm:text-xl"
                  />
                </button>

                {showProfileMenu && <UserDropdown onLogout={handleLogout} />}
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
