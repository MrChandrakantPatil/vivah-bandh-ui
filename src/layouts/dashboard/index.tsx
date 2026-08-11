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
          flex-1 min-w-0 transition-all duration-300 
          ${isCollapsed ? 'ml-18' : 'md:ml-68.75'}
        `}
      >
        <DashboardHeader
          setIsSidebarOpen={setIsSidebarOpen}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
