import {
  Heart,
  Eye,
  Users,
  MessageCircle,
  type LucideIcon,
} from 'lucide-react';
import { formatDistanceToNowStrict } from 'date-fns';

type ActivityConfigTypes =
  'profile_like' | 'profile_view' | 'interest_received' | 'message_received';

type ActivityTypes = {
  id: string;
  type: ActivityConfigTypes;
  actor: {
    id: string;
    name: string;
  };
  createdAt: string;
};

const activities: ActivityTypes[] = [
  {
    id: '1',
    type: 'profile_like',
    actor: {
      id: '201',
      name: 'Ananya',
    },
    createdAt: '2026-06-23T14:45:00Z',
  },
  {
    id: '2',
    type: 'profile_view',
    actor: {
      id: '210',
      name: 'Meera',
    },
    createdAt: '2026-06-22T12:00:00Z',
  },
  {
    id: '3',
    type: 'interest_received',
    actor: {
      id: '300',
      name: 'Pooja',
    },
    createdAt: '2026-06-23T11:00:00Z',
  },
  {
    id: '4',
    type: 'message_received',
    actor: {
      id: '356',
      name: 'Shruti',
    },
    createdAt: '2026-06-22T16:00:00Z',
  },
];

const activityConfig: Record<
  ActivityConfigTypes,
  {
    message: (name: string) => string;
    icon: LucideIcon;
    iconColor: string;
    iconBg: string;
  }
> = {
  profile_like: {
    message: (name: string) => `${name} liked your profile`,
    icon: Heart,
    iconColor: 'text-pink-500 fill-pink-500',
    iconBg: 'bg-pink-50',
  },

  profile_view: {
    message: (name: string) => `${name} viewed your profile`,
    icon: Eye,
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-50',
  },

  interest_received: {
    message: (name: string) => `You have a new interest from ${name}`,
    icon: Users,
    iconColor: 'text-purple-500 fill-purple-500',
    iconBg: 'bg-purple-50',
  },

  message_received: {
    message: (name: string) => `New message from ${name}`,
    icon: MessageCircle,
    iconColor: 'text-green-500',
    iconBg: 'bg-green-50',
  },
};

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
