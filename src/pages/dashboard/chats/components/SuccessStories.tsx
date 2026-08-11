import { Quote } from 'lucide-react';
import priya from '../../assets/priya.png';

export function SuccessStories() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h3 className="text-md font-bold text-gray-800 mb-4">Success Stories</h3>

      <div className="flex items-center justify-between gap-6">
        <div className="flex-1">
          <Quote size={20} className="text-pink-500 fill-pink-500 rotate-180" />

          <p className="mt-2 text-gray-600 text-sm leading-relaxed">
            Thousands of happy couples found their perfect match on Vivah Bandh.
          </p>
        </div>

        <div className="shrink-0">
          <div className="w-26 h-26 rounded-full overflow-hidden bg-gray-100">
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
          mt-8 px-4 py-3
          border border-pink-200 rounded-md
          text-pink-500 font-semibold
          hover:bg-pink-50 transition-colors
        "
      >
        Read More Stories
      </button>
    </div>
  );
}
