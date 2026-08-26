import { Heart, ShieldCheck, Users, Headphones } from 'lucide-react';

type GenderOptionValue = 'male' | 'female';

export const authBenefits = [
  {
    icon: ShieldCheck,
    title: '100% Secure & Confidential',
    description: 'Your privacy is our top priority',
  },
  {
    icon: Users,
    title: 'Verified Profiles',
    description: 'Genuine profiles for genuine connections',
  },
  {
    icon: Heart,
    title: 'Smart Matching',
    description: 'Advanced algorithm for better matches',
  },
  {
    icon: Headphones,
    title: '24/7 Customer Support',
    description: 'We are here to help you anytime',
  },
];

export const profileOptions = [
  {
    label: 'Myself',
    value: 'self',
    gender: null,
  },
  {
    label: 'Son',
    value: 'son',
    gender: 'male',
  },
  {
    label: 'Daughter',
    value: 'daughter',
    gender: 'female',
  },
  {
    label: 'Brother',
    value: 'brother',
    gender: 'male',
  },
  {
    label: 'Sister',
    value: 'sister',
    gender: 'female',
  },
  {
    label: 'Relative',
    value: 'relative',
    gender: null,
  },
  {
    label: 'Friend',
    value: 'friend',
    gender: null,
  },
] as const;

export const gender: {
  value: GenderOptionValue;
  label: string;
}[] = [
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Female',
    value: 'female',
  },
];

export const religionOptions = [
  {
    value: 'hindu',
    label: 'Hindu',
    communities: [
      {
        value: 'maratha',
        label: 'Maratha',
      },
      {
        value: 'brahmin',
        label: 'Brahmin',
      },
      {
        value: 'ckp',
        label: 'CKP',
      },
      {
        value: 'bhandari',
        label: 'Bhandari',
      },
      {
        value: 'mali',
        label: 'Mali',
      },
      {
        value: 'dhangar',
        label: 'Dhangar',
      },
      {
        value: 'kunbi',
        label: 'Kunbi',
      },
      {
        value: 'teli',
        label: 'Teli',
      },
      {
        value: 'gurav',
        label: 'Gurav',
      },
      {
        value: 'sutar',
        label: 'Sutar',
      },
      {
        value: 'lohar',
        label: 'Lohar',
      },
      {
        value: 'kumbhar',
        label: 'Kumbhar',
      },
      {
        value: 'sonar',
        label: 'Sonar',
      },
      {
        value: 'shimpi',
        label: 'Shimpi',
      },
      {
        value: 'koli',
        label: 'Koli',
      },
      {
        value: 'agri',
        label: 'Agri',
      },
      {
        value: 'banjara',
        label: 'Banjara',
      },
      {
        value: 'rajput',
        label: 'Rajput',
      },
      {
        value: 'lingayat',
        label: 'Lingayat',
      },
      {
        value: 'vani',
        label: 'Vani',
      },
      {
        value: 'brahma_kshatriya',
        label: 'Brahma Kshatriya',
      },
      {
        value: 'other',
        label: 'Other',
      },
    ],
  },

  {
    value: 'muslim',
    label: 'Muslim',
    communities: [
      {
        value: 'sunni',
        label: 'Sunni',
      },
      {
        value: 'shia',
        label: 'Shia',
      },
      {
        value: 'sunni_hanafi',
        label: 'Sunni Hanafi',
      },
      {
        value: 'sunni_barelvi',
        label: 'Sunni Barelvi',
      },
      {
        value: 'sunni_deobandi',
        label: 'Sunni Deobandi',
      },
      {
        value: 'bohra',
        label: 'Bohra',
      },
      {
        value: 'khoja',
        label: 'Khoja',
      },
      {
        value: 'memon',
        label: 'Memon',
      },
      {
        value: 'other',
        label: 'Other',
      },
    ],
  },

  {
    value: 'buddhist',
    label: 'Buddhist',
    communities: [
      {
        value: 'navayana_buddhist',
        label: 'Navayana Buddhist',
      },
      {
        value: 'other',
        label: 'Other',
      },
    ],
  },

  {
    value: 'christian',
    label: 'Christian',
    communities: [
      {
        value: 'catholic',
        label: 'Catholic',
      },
      {
        value: 'protestant',
        label: 'Protestant',
      },
      {
        value: 'syrian_christian',
        label: 'Syrian Christian',
      },
      {
        value: 'maharashtrian_christian',
        label: 'Maharashtrian Christian',
      },
      {
        value: 'other',
        label: 'Other',
      },
    ],
  },

  {
    value: 'jain',
    label: 'Jain',
    communities: [
      {
        value: 'digambar',
        label: 'Digambar',
      },
      {
        value: 'shwetambar',
        label: 'Shwetambar',
      },
      {
        value: 'sthanakvasi',
        label: 'Sthanakvasi',
      },
      {
        value: 'terapanthi',
        label: 'Terapanthi',
      },
      {
        value: 'other',
        label: 'Other',
      },
    ],
  },

  {
    value: 'sikh',
    label: 'Sikh',
    communities: [
      {
        value: 'jat_sikh',
        label: 'Jat Sikh',
      },
      {
        value: 'khatri',
        label: 'Khatri',
      },
      {
        value: 'arora',
        label: 'Arora',
      },
      {
        value: 'ramgarhia',
        label: 'Ramgarhia',
      },
      {
        value: 'other',
        label: 'Other',
      },
    ],
  },

  {
    value: 'parsi',
    label: 'Parsi',
    communities: [
      {
        value: 'parsi',
        label: 'Parsi',
      },
    ],
  },

  {
    value: 'jewish',
    label: 'Jewish',
    communities: [
      {
        value: 'bene_israel',
        label: 'Bene Israel',
      },
      {
        value: 'other',
        label: 'Other',
      },
    ],
  },

  {
    value: 'other',
    label: 'Other',
    communities: [
      {
        value: 'other',
        label: 'Other',
      },
    ],
  },

  {
    value: 'prefer_not_to_say',
    label: 'Prefer not to say',
    communities: [
      {
        value: 'prefer_not_to_say',
        label: 'Prefer not to say',
      },
    ],
  },
];
