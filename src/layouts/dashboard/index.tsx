import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardHeader } from './components/DashboardHeader';
import { DashboardSidebar } from './components/DashboardSidebar';

export function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <DashboardSidebar
        isSidebarOpen={isSidebarOpen}
        isCollapsed={isCollapsed}
      />

      <div
        className={`
          flex-1
          min-w-0
          transition-all duration-300
          ${isCollapsed ? 'ml-17.5' : 'md:ml-68.75'}
        `}
      >
        <DashboardHeader
          setIsSidebarOpen={setIsSidebarOpen}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />

        <main
          className="
            px-4 py-4
            bg-[#fdfdfe]
            sm:px-6 md:px-8 lg:px-10 sm:py-6 lg:py-8
          "
        >
          <div className="max-w-400 mx-auto text-gray-700">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
