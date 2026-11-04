import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardHeader } from './components/DashboardHeader';
import { DashboardSidebar } from './components/DashboardSidebar';

export function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className="flex flex-col h-screen bg-[#fdfdfe] overflow-hidden">
      <DashboardHeader
        setIsSidebarOpen={setIsSidebarOpen}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      <div className="relative flex flex-1 min-h-0 overflow-hidden">
        {isSidebarOpen && (
          <div
            className="
              fixed inset-x-0 top-18 bottom-0 z-40
              bg-black/50
              md:hidden
            "
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <DashboardSidebar
          isSidebarOpen={isSidebarOpen}
          isCollapsed={isCollapsed}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <main
          className={`
            flex-1
            min-w-0 min-h-0
            bg-linear-to-bl
            transition-[margin] duration-300 ease-in-out
            overflow-y-auto
            from-[#fff5f7] via-white to-[#fff0f4]
            ${isCollapsed
              ? 'md:ml-18' : 'md:ml-68'
            }
          `}
        >
          <div
            className="
              max-w-[1600px] min-h-full px-4 py-4 mx-auto
              sm:px-6 lg:px-8 sm:py-6 lg:py-8
            "
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
