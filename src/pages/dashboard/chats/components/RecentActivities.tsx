import { formatDistanceToNowStrict } from 'date-fns';
import { activities, activityConfig } from '../data';

const getTimeAgo = (date: string | Date) => {
  const result = formatDistanceToNowStrict(new Date(date));

  return (
    result
      .replace(' minutes', ' min')
      .replace(' minute', ' min')
      .replace(' hours', ' hours')
      .replace(' hour', ' hour')
      .replace(' days', ' days')
      .replace(' day', ' day') + ' ago'
  );
};

export function RecentActivities() {
  return (
    <div className="p-4 shadow rounded-lg border border-gray-200 text-gray-600">
      <div className="flex justify-between">
        <h4 className="font-bold text-md">Recent Activities</h4>

        <button className="font-semibold text-[#e63b66] text-xs">
          View All
        </button>
      </div>

      <div className="mt-4">
        {activities.map((activity) => {
          const config = activityConfig[activity.type];

          return (
            <div
              key={activity.id}
              className="flex items-center justify-between gap-2 mb-3"
            >
              <div className="flex flex-1 items-center gap-3 min-w-0">
                <div
                  className={`
                    p-2
                    rounded-full
                    ${config.iconBg}
                  `}
                >
                  <config.icon
                    size={18}
                    className={`
                      ${config.iconColor}
                    `}
                  />
                </div>

                <div className="font-bold text-gray-700 text-xs truncate">
                  {config.message(activity.actor.name)}
                </div>
              </div>

              <div className="font-semibold text-gray-400 text-xs">
                {getTimeAgo(activity.createdAt)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
