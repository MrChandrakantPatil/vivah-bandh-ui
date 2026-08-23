import { CircleCheck, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';
import { matches } from '../data';

export function MatchesSection() {
  const { scrollRef, canScrollLeft, canScrollRight, scrollLeft, scrollRight } =
    useHorizontalScroll('.match-card', matches.length);

  return (
    <div
      className="
        px-6 py-2
        shadow rounded-lg border border-gray-100
        text-gray-600
      "
    >
      <div className="flex justify-between pt-4">
        <h4 className="font-bold text-md">Recommended Matches</h4>

        <button className="font-semibold text-[#e63b66] text-xs">
          View All
        </button>
      </div>

      <div className="relative">
        {canScrollLeft && (
          <button
            type="button"
            onClick={scrollLeft}
            className="
              absolute top-1/3 z-10 -left-5
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

        <div ref={scrollRef} className="px-1 py-4 overflow-x-auto">
          <div className="grid grid-cols-[repeat(4,minmax(200px,1fr))] gap-6">
            {matches.map((profile) => (
              <div
                key={profile.id}
                className="shadow rounded-md overflow-hidden match-card"
              >
                <div className="relative">
                  <img
                    src={profile.image}
                    alt="Profile"
                    className="object-cover object-top"
                  />

                  <span
                    className="
                      absolute top-1.5 right-1.5
                      px-2 py-0.5
                      bg-[#ea416f] rounded-md
                      font-bold text-white text-xs
                    "
                  >
                    New
                  </span>

                  <span className="absolute right-2.5 bottom-2 p-2 bg-white rounded-full">
                    <Heart
                      size={16}
                      className="text-[#eb849f] fill-[#eb849f]"
                    />
                  </span>
                </div>

                <div className="p-3">
                  <h5 className="flex items-center gap-2 font-semibold text-sm">
                    {profile.name}, {profile.age}
                    <span
                      className="
                        flex items-center justify-center
                        w-4 h-4
                        bg-green-500 rounded-full
                      "
                    >
                      <CircleCheck size={15} className="font-bold text-white" />
                    </span>
                  </h5>

                  <p className="mt-2 text-gray-500 text-xs">
                    {profile.profession}
                  </p>

                  <p className="my-2 text-gray-500 text-xs">
                    {profile.address}
                  </p>

                  <span
                    className="
                      px-3 py-1
                      bg-[#fdf0f3] rounded-md
                      font-bold text-[#e63b66] text-xs
                    "
                  >
                    {profile.matchPercentage}% Match
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {canScrollRight && (
          <button
            type="button"
            onClick={scrollRight}
            className="
              absolute top-1/3 z-10 -right-5
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
    </div>
  );
}
