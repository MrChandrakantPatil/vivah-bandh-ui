import { useState } from 'react';
import type { Dispatch, SetStateAction, MouseEvent } from 'react';

import { NavLink } from 'react-router-dom';

import { sidebarMenu } from '../data';
import { NotificationBadge } from './NotificationBadge';
import { SidebarTooltip } from './SidebarTooltip';

export interface DashboardSidebarProp {
  isSidebarOpen: boolean;
  isCollapsed: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export interface TooltipState {
  label: string;
  left: number;
  top: number;
}

export function DashboardSidebar({
  isSidebarOpen,
  isCollapsed,
  setIsSidebarOpen,
}: DashboardSidebarProp) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const handleMenuClick = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <aside
      className={`
        fixed top-18 bottom-0 left-0 z-50
        flex flex-col
        w-68
        bg-white border-r border-slate-200
        transition-all duration-300 ease-in-out
        md:translate-x-0
        ${isCollapsed ? 'md:w-20' : ''}
        ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }
      `}
    >
      <nav className="flex-1 px-4 py-4 overflow-y-auto">
        {sidebarMenu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.id}
              to={item.path}
              title={isCollapsed ? item.label : ''}
              onClick={handleMenuClick}
              className={({ isActive }) => `
                flex items-center p-3 mb-2 rounded-xl
                transition-all duration-300
                justify-between
                ${isCollapsed ? 'md:justify-start' : ''}
                ${
                  isActive
                    ? 'bg-[#fff0f4] text-[#e21c56] font-semibold'
                    : 'text-slate-700 hover:bg-[#fff0f4] hover:text-[#e21c56] hover:translate-x-1'
                }
              `}
              onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => {
                if (!isCollapsed || window.innerWidth < 768) return;

                const rect = e.currentTarget.getBoundingClientRect();

                setTooltip({
                  label: item.label,
                  left: rect.right + 12,
                  top: rect.top + rect.height / 2,
                });
              }}
              onMouseLeave={() => setTooltip(null)}
            >
              <div className="flex items-center gap-4">
                <Icon size={20} />

                <span
                  className={`
                    whitespace-nowrap font-medium
                    transition-opacity duration-300
                    ${
                      isCollapsed
                        ? 'opacity-100 w-auto md:opacity-0 md:w-0'
                        : 'opacity-100'
                    }
                  `}
                >
                  {item.label}
                </span>
              </div>

              {item.badge ? (
                <div className={isCollapsed ? 'md:hidden' : ''}>
                  <NotificationBadge count={item.badge} />
                </div>
              ) : null}
            </NavLink>
          );
        })}
      </nav>

      <SidebarTooltip
        visible={isCollapsed && !!tooltip}
        label={tooltip?.label}
        position={tooltip}
      />
    </aside>
  );
}
