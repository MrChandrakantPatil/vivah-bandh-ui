import type { TabId } from './types';

export interface Tabs {
  id: TabId;
  label: string;
  count: number;
}

export const tabs: Tabs[] = [
  {
    id: 'recommendedMatches',
    label: 'Recommended',
    count: 0,
  },
  {
    id: 'newMatches',
    label: 'New Matches',
    count: 0,
  },
  {
    id: 'shortlistedMatches',
    label: 'Shortlisted',
    count: 0,
  },
];
