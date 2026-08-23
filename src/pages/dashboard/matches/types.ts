export type TabId =
  'recommended' | 'newMatches' | 'shortlisted' | 'interested' | 'viewed';

export interface Tabs {
  id: TabId;
  label: string;
  count: number;
}
