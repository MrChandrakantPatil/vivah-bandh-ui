// TODO :- Make common component for search box and use it for desktop & mobile view.

import { useState, useRef } from "react";
import { Search, MessageCircleMore, Bell, Menu, X, Heart } from "lucide-react";
import { NotificationBadge, Avatar, ProfileCard } from "../../../components/dashboard";
import { useHandleOutsideClick } from "../../../hooks/useHandleOutsideClick";

function HeaderIcon({ children, count = 0, ...props }) {
    return (
        <button
            className="
                relative w-5 h-5 
                sm:w-6 sm:h-6 
                md:w-6 md:h-6 
                lg:w-7 lg:h-7 
                flex items-center justify-center 
                rounded-full text-slate-600 hover:text-slate-800 
            "
            {...props}
        >
            {children}

            {!!count && (
                <NotificationBadge
                    count={count}
                    className="
                        absolute -top-1.75 -right-1.75 
                        sm:-top-1.75 sm:-right-1.75 
                        md:-top-2.25 md:-right-2.25
                        lg:-top-2.5 lg:-right-2.5
                    "
                />
            )}
        </button>
    );
}

export function DashboardHeader({ setIsSidebarOpen }) {
    const [showSearch, setShowSearch] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const profileRef = useRef(null);

    useHandleOutsideClick(profileRef, () => {
        setShowProfileMenu(false);
    });

    const handleSidebarOpen = () => {
        setIsSidebarOpen(true);
    };

    const toggleProfileMenu = () => {
        setShowProfileMenu(prev => !prev);
    };

    return (
        <header className="
            sticky top-0 w-full h-16 md:h-[85px] z-30
            bg-white/95 backdrop-blur-md shadow-sm
            border-b border-gray-100 text-slate-800
        ">
            <div className="h-full px-6 lg:px-10 flex items-center justify-between">
                {showSearch ? (
                    <div className="flex items-center gap-1 w-full">
                        <button
                            className="flex items-center justify-start w-9 h-9 rounded-full hover:bg-gray-100"
                            aria-label="Close Search"
                            onClick={() => setShowSearch(false)}
                        >
                            <X size={20} />
                        </button>

                        <div className="flex items-center flex-1 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2">
                            <Search size={18} className="text-slate-700" />

                            <input
                                type="text"
                                aria-label="Search Profiles"
                                placeholder="Search profiles..."
                                autoFocus
                                className="flex-1 ml-2 bg-transparent outline-none text-sm"
                            />
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center gap-2">
                            <button
                                className="flex items-center justify-center rounded-full hover:bg-gray-100"
                                aria-label="Open Sidebar"
                                onClick={handleSidebarOpen}
                            >
                                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>

                            <div className="flex items-center gap-2">
                                <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-[#e13060]" />

                                <span className="font-serif font-bold text-[#e13060] text-lg sm:text-2xl">
                                    Vivah Bandh
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 sm:gap-4 lg:gap-5">
                            <HeaderIcon ariaLabel="Search" onClick={() => setShowSearch(true)} >
                                <Search className="w-full h-full" />
                            </HeaderIcon>

                            <HeaderIcon ariaLabel="Messages" count={5} >
                                <MessageCircleMore className="w-full h-full" />
                            </HeaderIcon>

                            <HeaderIcon ariaLabel="Notifications" count={35} >
                                <Bell className="w-full h-full" />
                            </HeaderIcon>

                            <div ref={profileRef} className="relative flex items-center">
                                <button
                                    aria-label="User Profile"
                                    onClick={toggleProfileMenu}
                                >
                                    <Avatar
                                        // image="https://i.pravatar.cc/300?img=68"
                                        name="Chandrakant Patil"
                                        className="w-6 h-6 text-sm sm:w-7 sm:h-7 sm:text-lg md:w-8 md:h-8 md:text-2xl lg:w-9 lg:h-9"
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