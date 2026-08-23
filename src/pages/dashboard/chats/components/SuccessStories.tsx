import { Quote } from 'lucide-react';
import { priya } from '@/assets/images';

export function SuccessStories() {
  return (
    <div className="p-6 bg-white shadow-sm rounded-xl border border-gray-200">
      <h3 className="mb-4 font-bold text-gray-800 text-md">Success Stories</h3>

      <div className="flex items-center justify-between gap-6">
        <div className="flex-1">
          <Quote size={20} className="text-pink-500 fill-pink-500 rotate-180" />

          <p className="mt-2 leading-relaxed text-gray-600 text-sm">
            Thousands of happy couples found their perfect match on Vivah Bandh.
          </p>
        </div>

        <div className="shrink-0">
          <div className="w-26 h-26 bg-gray-100 rounded-full overflow-hidden">
            <img
              src={priya}
              alt="Success Story"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <button
        className="
          px-4 py-3 mt-8
          rounded-md border border-pink-200
          font-semibold text-pink-500
          transition-colors
          hover:bg-pink-50
        "
      >
        Read More Stories
      </button>
    </div>
  );
}
