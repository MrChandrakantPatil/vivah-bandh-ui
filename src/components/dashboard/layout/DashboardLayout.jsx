import { useState } from "react";
import { Outlet } from "react-router-dom";
import { DashboardSidebar, DashboardHeader } from "..";
import { SIDEBAR_WIDTH } from "../../../constants/dashboard";

export function DashboardLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
    return (
        <div className="flex">
            <div
                className={`
                    fixed inset-0 bg-black/50 z-40
                    transition-opacity duration-300
                    ${ isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible" }
                `}
                onClick={() => setIsSidebarOpen(false)}
            />
            
            <DashboardSidebar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />

            <div className="flex-1 min-w-0">
                <DashboardHeader setIsSidebarOpen={setIsSidebarOpen} />

                <Outlet />
            </div>
        </div>
    );
}