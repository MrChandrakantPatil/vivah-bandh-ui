import { Heart, Users, Eye, MessageSquareText } from 'lucide-react';

export const dashboardStats = [
  {
    id: 1,
    title: 'Matches',
    count: 132,
    growth: '18',
    icon: Heart,
    iconBg: 'bg-pink-50',
    iconColor: 'text-pink-500 fill-pink-500',
    growthColor: 'text-pink-500',
  },

  {
    id: 2,
    title: 'Interests',
    count: 54,
    growth: '12',
    icon: Users,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-500 fill-purple-500',
    growthColor: 'text-purple-500',
  },

  {
    id: 3,
    title: 'Profile Views',
    count: 890,
    growth: '120',
    icon: Eye,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500',
    growthColor: 'text-amber-500',
  },

  {
    id: 4,
    title: 'Messages',
    count: 23,
    growth: '5',
    icon: MessageSquareText,
    iconBg: 'bg-green-50',
    iconColor: 'text-green-500',
    growthColor: 'text-green-500',
  },
];
