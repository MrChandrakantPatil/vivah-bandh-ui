import { useState, useEffect } from 'react';
import { DashboardSidebar, DashboardHeader, Card, MatchesSection, RecentActivities, ProfileStrength, ProfileViewsChart } from "../components/dashboard";
import { Search, Crown, MessageCircle, Bell, ChevronDown } from 'lucide-react';
import { SIDEBAR_WIDTH } from "../constants/dashboard";
import { dashboardStats } from "../data";
import priya from "../assets/priya.png";

export function Dashboard() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setProgress(80);
        }, 100)
    }, [])

    return (
        <div className="min-h-screen bg-white text-black">
            <DashboardSidebar />

            <div style={{ marginLeft: `${SIDEBAR_WIDTH}px` }}>
                {/* <DashboardHeader /> */}

                <div className="max-w-[1600px] mx-auto px-10 py-8 bg-[#fdfdfe]">
                    <div className='flex gap-6'>
                        <div className='flex-1'>
                            <h1 className="font-semibold text-gray-700 text-2xl">
                                Welcome back, Chandrakant!
                            </h1>

                            <p className="text-gray-500 text-md">
                                Let's find your perfect life partner
                            </p>
                                
                            <div className='my-6 grid grid-cols-4 gap-6'>
                                {dashboardStats.map((stat) => (
                                    <Card key={stat.id} {...stat} />
                                ))}
                            </div>
                            
                            <MatchesSection />

                            <div className='grid grid-cols-2 gap-6 mt-6'>
                                <RecentActivities />

                                <div className="p-4 rounded-lg shadow-sm border border-gray-200">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-bold text-md">
                                            Profile Views Overview
                                        </h3>

                                        <select className="border border-gray-300 rounded-sm p-1 text-xs">
                                            <option>This Week</option>
                                            <option>This Month</option>
                                        </select>
                                    </div>

                                    <ProfileViewsChart />

                                    <div className="border-t border-gray-200 pt-2 flex items-center">
                                        <div className="flex-1 flex items-center gap-1">
                                             <span className="text-gray-500 font-semibold text-xs">
                                                Total Views
                                            </span>
                                            
                                            <span className='text-gray-500 font-bold text-md'>
                                                890
                                            </span>
                                        </div>

                                        <div className="flex-1 flex items-center gap-1 border-l border-gray-200 pl-6">
                                            <span className='text-green-500 font-bold text-md'>
                                                +120
                                            </span>
                                            
                                            <span className="text-gray-500 font-semibold text-xs">
                                                vs last week
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='w-[350px] shrink-0'>
                            <ProfileStrength />

                            <div className='p-5 border border-gray-200 rounded-lg shadow mt-6'>
                                <div className="flex justify-between">
                                    <h4 className="font-bold text-md">
                                        Who Viewed You
                                    </h4>

                                    <button className="text-[#e63b66] font-semibold text-xs">
                                        View All
                                    </button>
                                </div>

                                <div className='grid grid-cols-6 gap-2 mt-5'>
                                    {[...Array(5)].map((_, index) => (
                                        <div className='w-10 h-10 bg-[#f9f1f3] rounded-full overflow-hidden'>
                                            <img
                                                src={priya}
                                                alt="Profile"
                                                className="w-full h-full object-cover object-center"
                                            />
                                        </div>
                                    ))}

                                    <div className='w-10 h-10 bg-[#f9f1f3] rounded-full overflow-hidden flex justify-center items-center font-bold text-gray-600 text-xs'>
                                        +15
                                    </div>
                                </div>
                            </div>

                            <div className='px-5 py-4 border border-gray-200 shadow rounded-lg mt-6'>
                                <div className="flex justify-between">
                                    <h4 className="font-bold text-md">
                                        Success Stories
                                    </h4>
                                </div>

                                <div className='flex justify-between gap-5 mt-4'>
                                    <div className='rounded-full overflow-hidden w-25 h-25'>
                                        <img
                                            src={priya}
                                            alt="Profile"
                                            className="w-full h-full object-cover object-center"
                                        />
                                    </div>

                                    <div className='flex-1'>
                                        <p className='text-gray-700 text-sm'>
                                            Thousands of couples found their perfect match on Vivah Bandh.
                                        </p>

                                        <button className="mt-4 px-3 py-1 border border-pink-300 rounded-md text-pink-600 font-semibold hover:bg-pink-50 transition text-xs">
                                            Read Stories
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}