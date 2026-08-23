import {
  Heart,
  Users,
  Eye,
  MessageSquareText,
  MessageCircle,
} from 'lucide-react';
import { user1, user2, user3, user4 } from '@/assets/images';
import type { ActivityTypeValue, Activity } from './types';
import type { LucideIcon } from 'lucide-react';

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

export const matches = [
  {
    id: 1,
    name: 'Priya',
    image: user1,
    age: 26,
    profession: 'Software Engineer',
    address: 'Bengluru, Karnataka',
    matchPercentage: 92,
  },
  {
    id: 2,
    name: 'Sneha',
    image: user2,
    age: 24,
    profession: 'Product Manager',
    address: 'Pune, Maharashtra',
    matchPercentage: 89,
  },
  {
    id: 3,
    name: 'Kamal',
    image: user3,
    age: 30,
    profession: 'Software Engineer',
    address: 'Mumbai, Maharashtra',
    matchPercentage: 85,
  },
  {
    id: 4,
    name: 'Pooja',
    image: user4,
    age: 32,
    profession: 'Marketing Manager',
    address: 'Bengluru, Karnataka',
    matchPercentage: 92,
  },
];

export const profileMatrix = [
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

export const profileViewsData = [
  { day: 'Mon', views: 50 },
  { day: 'Tue', views: 95 },
  { day: 'Wed', views: 70 },
  { day: 'Thu', views: 120 },
  { day: 'Fri', views: 100 },
  { day: 'Sat', views: 140 },
  { day: 'Sun', views: 190 },
];

export const activities: Activity[] = [
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

export const activityConfig: Record<
  ActivityTypeValue,
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
