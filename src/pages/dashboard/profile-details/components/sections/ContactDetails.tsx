import { Mail, Phone } from 'lucide-react';

import { SectionCard } from '../SectionCard';
import { DetailRows } from '../DetailRows';

export function ContactDetails() {
  const contactInfo = [
    {
      label: 'Mobile Number',
      value: '+91 9876******',
      icon: Phone,
    },
    {
      label: 'Email Address',
      value: '**********@example.com',
      icon: Mail,
    },
  ];

  return (
    <SectionCard title="Contact Details" icon={Phone}>
      <DetailRows items={contactInfo} />
    </SectionCard>
  );
}
