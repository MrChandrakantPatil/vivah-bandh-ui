import {
  BriefcaseBusiness,
  Heart,
  HeartHandshake,
  IndianRupee,
  Ruler,
  Sparkles,
  UsersRound,
} from 'lucide-react';

import { heightOptions } from './options/heightOptions';
import { occupationOptions } from './options/occupationOptions';
import { maritalStatusOptions } from './options/maritalStatusOptions';
import { familyTypeOptions } from './options/familyTypeOptions';
import { hobbiesOptions } from './options/hobbiesOptions';
import { incomeOptions } from './options/incomeOptions';
import { lifestyleOptions } from './options/lifestyleOptions';

export const moreFilterOptions = [
  {
    key: 'height',
    title: 'Height',
    icon: Ruler,
    options: heightOptions,
  },

  {
    key: 'occupation',
    title: 'Occupation',
    icon: BriefcaseBusiness,
    options: occupationOptions,
  },

  {
    key: 'maritalStatus',
    title: 'Marital Status',
    icon: HeartHandshake,
    options: maritalStatusOptions,
  },

  {
    key: 'familyType',
    title: 'Family Type',
    icon: UsersRound,
    options: familyTypeOptions,
  },

  {
    key: 'hobbies',
    title: 'Hobbies',
    icon: Heart,
    options: hobbiesOptions,
  },

  {
    key: 'annualIncome',
    title: 'Annual Income',
    icon: IndianRupee,
    options: incomeOptions,
  },

  {
    key: 'lifestyle',
    title: 'Lifestyle',
    icon: Sparkles,
    options: lifestyleOptions,
  },
];
