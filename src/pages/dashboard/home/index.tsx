import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from './components/Card';
import { MatchesSection } from './components/MatchesSection';
import { RecentActivities } from './components/RecentActivities';
import { ProfileStrength } from './components/ProfileStrength';
import { ProfileViewsChart } from './components/ProfileViewsChart';
import { dashboardStats } from './data';
import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';
import { useAuth } from '@/features/auth';
import { female1, female2 } from '@/assets/images';


export function Dashboard() {
  const { scrollRef, canScrollLeft, canScrollRight, scrollLeft, scrollRight } =
    useHorizontalScroll('.dashboard-card', dashboardStats.length);

  const { profile } = useAuth();

  return (
    <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
      <div className="flex-1 min-w-0">
        <h1 className="font-semibold text-xl sm:text-2xl lg:text-3xl">
          Welcome back, {profile?.name}!
        </h1>

        <p className="mt-1 text-gray-500 text-sm sm:text-base">
          Let's find your perfect life partner
        </p>

        <div className="relative my-6">
          {canScrollLeft && (
            <button
              type="button"
              onClick={scrollLeft}
              className="
                absolute top-1/2 left-1 z-10
                flex items-center justify-center
                w-9 h-9
                bg-white shadow rounded-full border border-gray-200
                text-gray-600
                -translate-y-1/2
              "
            >
              <ChevronLeft size={20} />
            </button>
          )}

          <div ref={scrollRef} className="pb-4 overflow-x-auto">
            <div className="grid grid-cols-[repeat(4,minmax(200px,1fr))] gap-4">
              {dashboardStats.map((stat) => (
                <div key={stat.id} className="dashboard-card">
                  <Card {...stat} />
                </div>
              ))}
            </div>
          </div>

          {canScrollRight && (
            <button
              type="button"
              onClick={scrollRight}
              className="
                absolute top-1/2 right-1 z-10
                flex items-center justify-center
                w-9 h-9
                bg-white shadow rounded-full border border-gray-200
                text-gray-600
                -translate-y-1/2
              "
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>

        <MatchesSection />

        <div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-2">
          <RecentActivities />

          <div className="p-4 shadow-sm rounded-lg border border-gray-200 text-gray-600">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-md">Profile Views Overview</h3>

              <select className="p-1 rounded-sm border border-gray-300 text-xs">
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>

            <ProfileViewsChart />

            <div className="flex items-center pt-2 border-t border-gray-200">
              <div className="flex-1 flex items-center gap-1">
                <span className="font-semibold text-gray-500 text-xs">
                  Total Views
                </span>

                <span className="font-bold text-gray-500 text-md">890</span>
              </div>

              <div
                className="
                  flex-1 flex items-center gap-1
                  pl-6
                  border-l border-gray-200
                "
              >
                <span className="font-bold text-green-500 text-md">+120</span>

                <span className="font-semibold text-gray-500 text-xs">
                  vs last week
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shrink-0 w-full xl:w-87.5">
        <ProfileStrength />

        <div
          className="
            p-5 mt-6
            shadow rounded-lg border border-gray-200
            text-gray-600
          "
        >
          <div className="flex justify-between">
            <h4 className="font-bold text-md">Who Viewed You</h4>

            <button className="font-semibold text-[#e63b66] text-xs">
              View All
            </button>
          </div>

          <div className="grid grid-cols-6 gap-2 mt-5">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="w-10 h-10 bg-[#f9f1f3] rounded-full overflow-hidden"
              >
                <img
                  src={female1}
                  alt="Profile"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            ))}

            <div
              className="
                flex items-center justify-center
                w-10 h-10
                bg-[#f9f1f3] rounded-full
                font-bold text-gray-600 text-xs
                overflow-hidden
              "
            >
              +15
            </div>
          </div>
        </div>

        <div
          className="
            px-5 py-4 mt-6
            shadow rounded-lg border border-gray-200
            text-gray-600
          "
        >
          <div className="flex justify-between">
            <h4 className="font-bold text-md">Success Stories</h4>
          </div>

          <div className="flex justify-between gap-5 mt-4">
            <div className="w-25 h-25 rounded-full overflow-hidden">
              <img
                src={female2}
                alt="Profile"
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="flex-1">
              <p className="text-gray-700 text-sm">
                Thousands of couples found their perfect match on Vivah Bandh.
              </p>

              <button
                className="
                  px-3 py-1 mt-4
                  rounded-md border border-pink-300
                  font-semibold text-pink-600 text-xs
                  transition
                  hover:bg-pink-50
                "
              >
                Read Stories
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
