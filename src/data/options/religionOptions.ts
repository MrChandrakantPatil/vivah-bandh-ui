export const religionOptions = [
  'Hindu',
  'Muslim',
  'Buddhist',
  'Christian',
  'Jain',
  'Sikh',
  'Parsi',
  'Jewish',
  'Other',
];

export const communityOptions = [
  'Brahmin',
  'Rajput',
  'Maratha',
  'Jat',
  'Gujjar',
  'Yadav',
  'Patel',
  'Bania',
  'Kayastha',
  'Kshatriya',
  'Vaishya',
  'Lingayat',
  'Vokkaliga',
  'Reddy',
  'Kamma',
  'Nair',
  'Ezhava',
  'Chettiar',
  'Other',
];

export const communitiesByReligion: Record<string, readonly string[]> = {
  Hindu: [
    'Maratha',
    'Brahmin',
    'CKP',
    'Bhandari',
    'Mali',
    'Dhangar',
    'Kunbi',
    'Teli',
    'Gurav',
    'Sutar',
    'Lohar',
    'Kumbhar',
    'Sonar',
    'Shimpi',
    'Koli',
    'Agri',
    'Banjara',
    'Rajput',
    'Lingayat',
    'Vani',
    'Brahma Kshatriya',
    'Other',
  ],

  Muslim: [
    'Sunni',
    'Shia',
    'Sunni Hanafi',
    'Sunni Barelvi',
    'Sunni Deobandi',
    'Bohra',
    'Khoja',
    'Memon',
    'Other',
  ],

  Buddhist: ['Navayana Buddhist', 'Other'],

  Christian: [
    'Catholic',
    'Protestant',
    'Syrian Christian',
    'Maharashtrian Christian',
    'Other',
  ],

  Jain: ['Digambar', 'Shwetambar', 'Sthanakvasi', 'Terapanthi', 'Other'],

  Sikh: ['Jat Sikh', 'Khatri', 'Arora', 'Ramgarhia', 'Other'],

  Parsi: ['Parsi'],

  Jewish: ['Bene Israel', 'Other'],

  Other: ['Other'],
};
