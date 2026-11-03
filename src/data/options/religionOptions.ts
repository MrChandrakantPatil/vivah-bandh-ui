import type { SelectOptionType } from '@/types/common.types';

export const religionOptions = [
  { label: 'Hindu', value: 'hindu' },
  { label: 'Muslim', value: 'muslim' },
  { label: 'Buddhist', value: 'buddhist' },
  { label: 'Christian', value: 'christian' },
  { label: 'Jain', value: 'jain' },
  { label: 'Sikh', value: 'sikh' },
  { label: 'Parsi', value: 'parsi' },
  { label: 'Jewish', value: 'jewish' },
  { label: 'Other', value: 'other' },
];

export const communityOptions = [
  { label: 'Brahmin', value: 'brahmin' },
  { label: 'Rajput', value: 'rajput' },
  { label: 'Maratha', value: 'maratha' },
  { label: 'Jat', value: 'jat' },
  { label: 'Gujjar', value: 'gujjar' },
  { label: 'Yadav', value: 'yadav' },
  { label: 'Patel', value: 'patel' },
  { label: 'Bania', value: 'bania' },
  { label: 'Kayastha', value: 'kayastha' },
  { label: 'Kshatriya', value: 'kshatriya' },
  { label: 'Vaishya', value: 'vaishya' },
  { label: 'Lingayat', value: 'lingayat' },
  { label: 'Vokkaliga', value: 'vokkaliga' },
  { label: 'Reddy', value: 'reddy' },
  { label: 'Kamma', value: 'kamma' },
  { label: 'Nair', value: 'nair' },
  { label: 'Ezhava', value: 'ezhava' },
  { label: 'Chettiar', value: 'chettiar' },
  { label: 'Other', value: 'other' },
];

export const communitiesByReligion: Record<string, SelectOptionType[]> = {
  hindu: [
    { label: 'Maratha', value: 'maratha' },
    { label: 'Brahmin', value: 'brahmin' },
    { label: 'CKP', value: 'ckp' },
    { label: 'Bhandari', value: 'bhandari' },
    { label: 'Mali', value: 'mali' },
    { label: 'Dhangar', value: 'dhangar' },
    { label: 'Kunbi', value: 'kunbi' },
    { label: 'Teli', value: 'teli' },
    { label: 'Gurav', value: 'gurav' },
    { label: 'Sutar', value: 'sutar' },
    { label: 'Lohar', value: 'lohar' },
    { label: 'Kumbhar', value: 'kumbhar' },
    { label: 'Sonar', value: 'sonar' },
    { label: 'Shimpi', value: 'shimpi' },
    { label: 'Koli', value: 'koli' },
    { label: 'Agri', value: 'agri' },
    { label: 'Banjara', value: 'banjara' },
    { label: 'Rajput', value: 'rajput' },
    { label: 'Lingayat', value: 'lingayat' },
    { label: 'Vani', value: 'vani' },
    { label: 'Brahma Kshatriya', value: 'brahmaKshatriya' },
    { label: 'Other', value: 'other' },
  ],

  muslim: [
    { label: 'Sunni', value: 'sunni' },
    { label: 'Shia', value: 'shia' },
    { label: 'Sunni Hanafi', value: 'sunniHanafi' },
    { label: 'Sunni Barelvi', value: 'sunniBarelvi' },
    { label: 'Sunni Deobandi', value: 'sunniDeobandi' },
    { label: 'Bohra', value: 'bohra' },
    { label: 'Khoja', value: 'khoja' },
    { label: 'Memon', value: 'memon' },
    { label: 'Other', value: 'other' },
  ],

  buddhist: [
    { label: 'Navayana Buddhist', value: 'navayanaBuddhist' },
    { label: 'Other', value: 'other' },
  ],

  christian: [
    { label: 'Catholic', value: 'catholic' },
    { label: 'Protestant', value: 'protestant' },
    { label: 'Syrian Christian', value: 'syrianChristian' },
    { label: 'Maharashtrian Christian', value: 'maharashtrianChristian' },
    { label: 'Other', value: 'other' },
  ],

  jain: [
    { label: 'Digambar', value: 'digambar' },
    { label: 'Shwetambar', value: 'shwetambar' },
    { label: 'Sthanakvasi', value: 'sthanakvasi' },
    { label: 'Terapanthi', value: 'terapanthi' },
    { label: 'Other', value: 'other' },
  ],

  sikh: [
    { label: 'Jat Sikh', value: 'jatSikh' },
    { label: 'Khatri', value: 'khatri' },
    { label: 'Arora', value: 'arora' },
    { label: 'Ramgarhia', value: 'ramgarhia' },
    { label: 'Other', value: 'other' },
  ],

  parsi: [{ label: 'Parsi', value: 'parsi' }],

  jewish: [
    { label: 'Bene Israel', value: 'beneIsrael' },
    { label: 'Other', value: 'other' },
  ],

  other: [{ label: 'Other', value: 'other' }],
};
