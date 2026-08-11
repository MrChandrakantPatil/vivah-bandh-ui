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
    <div className="border border-gray-200 rounded-lg shadow p-4 text-gray-600">
      <div className="flex justify-between">
        <h4 className="font-bold text-md">Recent Activities</h4>

        <button className="text-[#e63b66] font-semibold text-xs">
          View All
        </button>
      </div>

      <div className="mt-4">
        {activities.map((activity) => {
          const config = activityConfig[activity.type];

          return (
            <div
              key={activity.id}
              className="flex justify-between items-center gap-2 mb-3"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={`p-2 rounded-full ${config.iconBg}`}>
                  <config.icon size={18} className={`${config.iconColor}`} />
                </div>

                <div className="text-gray-700 font-bold text-xs truncate">
                  {config.message(activity.actor.name)}
                </div>
              </div>

              <div className="text-gray-400 font-semibold text-xs">
                {getTimeAgo(activity.createdAt)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
