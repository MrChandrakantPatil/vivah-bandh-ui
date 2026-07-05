import { Link, NavLink } from 'react-router-dom';
import { Heart, Crown } from 'lucide-react';
import { SIDEBAR_WIDTH } from "../../../constants/dashboard";
import { sidebarMenu } from "../../../data";
import { NotificationBadge } from "./NotificationBadge";
import { Avatar } from "./Avatar";

export function DashboardSidebar({ isSidebarOpen, setIsSidebarOpen }) {
    return (
        <div
            className={`
                fixed top-0 left-0
                flex flex-col
                h-screen z-50
                border-r border-gray-200
                transition-transform duration-300 ease-in-out
                overflow-y-auto

                ${isSidebarOpen ? "bg-[#f59ead] translate-x-0" : "bg-white -translate-x-full"}

                bg-white
                
            `}
            style={{ width: SIDEBAR_WIDTH }}
        >
            <Link to="/" className='flex items-center justify-center space-x-2 py-6'>
                <Heart className='w-12 h-12 text-[#e13060]' />

                <div className='flex flex-col'>
                    <div className='font-serif text-2xl font-bold text-[#e13060]'>
                        Vivah Bandh
                    </div>

                    <div className='text-xs text-gray-700 -mt-1'>
                        Find Your Soulmate
                    </div>
                </div>
            </Link>

            <aside className="flex-1 p-4 pt-1 md:p-5 md:pt-2 rounded-t-2xl bg-white">
                {sidebarMenu.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.id}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center justify-between
                                p-3 mb-2 rounded-xl transition-colors transition-transform duration-200
                                ${isActive
                                    ? "bg-[#fdeff1] text-[#e13060] font-semibold"
                                    : "text-slate-700 hover:bg-[#fdeff1] font-semibold hover:text-[#e13060] hover:translate-x-1"
                                }`
                            }
                        >
                            <div className="flex items-center gap-4">
                                <Icon size={20} />

                                <span className="text-base">
                                    {item.label}
                                </span>
                            </div>

                            {!!item.badge && (
                                <NotificationBadge count={item.badge} />
                            )}
                        </NavLink>
                    );
                })}
            </aside>
        </div>
    );
}