import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { sidebarMenu } from '../data';
import { NotificationBadge } from './NotificationBadge';
import { SidebarTooltip } from './SidebarTooltip';
import { SIDEBAR_WIDTH, COLLAPSED_WIDTH } from '../constants';
import type { DashboardSidebarProp, TooltipState } from '../types';
import { logo, logoIcon, devider } from '@/assets/images';
import { Crown } from 'lucide-react';

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
      <div className="border-b border-gray-200 overflow-hidden">
        <Link to="/" className="grid items-center w-full h-21 px-1">
          <img
            src={logo}
            alt="Vivah Bandh"
            className={`
                col-start-1 row-start-1
                w-60 h-auto mx-auto
                transition-opacity duration-300
                ${isCollapsed ? 'opacity-0' : 'opacity-100'}
              `}
          />

          <img
            src={logoIcon}
            alt="Vivah Bandh"
            className={`
                col-start-1 row-start-1
                w-12 h-12 object-contain mx-auto
                transition-opacity duration-300
                ${isCollapsed ? 'opacity-100' : 'opacity-0'}
              `}
          />
        </Link>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto px-3">
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

        <div className="w-full h-4 overflow-hidden mt-4 mb-4">
          <img
            src={devider}
            alt="Vivah Bandh"
            className="col-start-1 row-start-1 h-auto mx-auto transition-opacity duration-300"
          />
        </div>

        <div className="text-center">
          <div
            className={`flex items-center justify-center w-9 h-9 mx-auto bg-[#e21c56] rounded-full`}
          >
            <Crown size={20} className="text-white fill-white" />
          </div>

          <div
            className={`
              transition-opacity
              ${isCollapsed ? 'opacity-0 pointer-events-none duration-0' : 'opacity-100 delay-300 duration-200'}
            `}
          >
            <h3 className="text-[#e21c56] font-semibold my-2">
              Upgrade to Premium
            </h3>

            <p className="text-gray-600 text-sm mb-4">
              Unlock all features and connect with the right matches.
            </p>

            <button
              type="button"
              className="
                  flex items-center justify-center
                  mx-auto px-4 py-2 bg-[#e21c56] hover:bg-red-600
                  border border-[#e21c56] rounded-md text-white text-sm font-bold
                "
            >
              Upgrade Now
            </button>
          </div>
        </div>
      </nav>

      <SidebarTooltip
        visible={!!tooltip}
        label={tooltip?.label}
        position={tooltip}
      />
    </aside>
  );
}
