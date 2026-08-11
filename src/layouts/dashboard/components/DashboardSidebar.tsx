import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { SIDEBAR_WIDTH } from '../constants';
import { sidebarMenu } from '../data';
import { NotificationBadge } from './NotificationBadge';
import { SidebarTooltip } from './SidebarTooltip';
import { COLLAPSED_WIDTH } from '../constants';
import type { DashboardSidebarProp, TooltipState } from '../types';

export function DashboardSidebar({
  isSidebarOpen,
  isCollapsed,
}: DashboardSidebarProp) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  return (
    <aside
      className={`
        fixed top-0 left-0 z-50 h-full bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}
      style={{ width: isCollapsed ? COLLAPSED_WIDTH : SIDEBAR_WIDTH }}
    >
      <div className="relative">
        <Link
          to="/"
          className={`flex items-center py-5 px-4 ${isCollapsed ? '' : 'justify-between'}`}
        >
          <div className="flex items-center min-w-0">
            <Heart size={40} className="shrink-0 text-[#e13060]" />

            <div
              className={`
                overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out
                ${isCollapsed ? 'w-0 opacity-0 ml-0' : 'w-42.5 opacity-100 ml-3'}
              `}
            >
              <h2 className="font-serif text-2xl font-bold text-[#e13060] leading-none whitespace-nowrap">
                Vivah Bandh
              </h2>

              <p className="mt-1 text-xs text-gray-500 whitespace-nowrap">
                Find Your Soulmate
              </p>
            </div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {sidebarMenu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.id}
              to={item.path}
              title={isCollapsed ? item.label : ''}
              className={({ isActive }) => `
                flex items-center p-3 mb-2 rounded-xl transition-all duration-300
                ${isCollapsed ? '' : 'justify-between'}
                ${isActive ? 'bg-[#fdeff1] text-[#e13060] font-semibold' : 'text-slate-700 hover:bg-[#fdeff1] hover:text-[#e13060] hover:translate-x-1'}
              `}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                if (!isCollapsed) return;

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
                    font-medium whitespace-nowrap transition-opacity duration-300
                    ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}
                  `}
                >
                  {item.label}
                </span>
              </div>

              {!isCollapsed && item.badge ? (
                <NotificationBadge count={item.badge} />
              ) : null}
            </NavLink>
          );
        })}
      </nav>

      <SidebarTooltip
        visible={!!tooltip}
        label={tooltip?.label}
        position={tooltip}
      />
    </aside>
  );
}
