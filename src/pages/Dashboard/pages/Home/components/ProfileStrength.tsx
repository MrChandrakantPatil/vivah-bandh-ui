import { useState, useEffect } from 'react';
import { CircleCheck, Circle } from 'lucide-react';

const profileMatrix = [
  {
    label: 'Basic Information',
    status: true,
  },
  {
    label: 'Add Photos',
    status: true,
  },
  {
    label: 'About Yourself',
    status: true,
  },
  {
    label: 'Partner Prefrences',
    status: true,
  },
  {
    label: 'Verify Mobile',
    status: false,
  },
];

export function ProfileStrength() {
  const [progress, setProgress] = useState(0);

  const percentage = 75;

  useEffect(() => {
    setTimeout(() => {
      setProgress(percentage);
    }, 100);
  }, [percentage]);

  const size = 100;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="p-5 border border-gray-200 rounded-lg shadow text-gray-600">
      <h4 className="font-bold text-md">Profile Strength</h4>

      <div className="flex justify-between items-center gap-4 my-6">
        <div className="w-25 mx-auto">
          <div className="relative w-full aspect-square">
            <svg
              viewBox={`0 0 ${size} ${size}`}
              className="w-full h-full -rotate-90"
            >
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#fcedf1"
                strokeWidth={strokeWidth}
                fill="none"
              />

              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#ef6084"
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-bold text-xl">{percentage}%</span>
            </div>
          </div>
        </div>

        <div className="flex-1">
          {profileMatrix.map((matrix) => (
            <div className="flex gap-10 mb-2">
              <div className="flex-1 text-black text-xs">{matrix.label}</div>

              <div>
                {matrix.status === true ? (
                  <CircleCheck size={15} className="font-bold text-green-500" />
                ) : (
                  <Circle size={15} className="font-bold text-gray-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full px-4 py-2.5 bg-[#fef5f7] border border-red-500 rounded-lg font-semibold text-red-600 text-xs">
        Improve Profile
      </button>
    </div>
  );
}
