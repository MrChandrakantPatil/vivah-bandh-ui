import { Heart } from 'lucide-react';
import { SectionCard } from '../SectionCard';
import type { ProfileDetailsData } from '../../types';

interface AboutUsProps {
  profile: ProfileDetailsData;
}

export function AboutUs({ profile }: AboutUsProps) {
  return (
    <SectionCard title="About Us" icon={Heart}>
      <p className="whitespace-pre-line leading-7 text-slate-600 text-sm">
        {profile.aboutMe || 'Not specified'}
      </p>
    </SectionCard>
  );
}
