import {
  User,
  Calendar,
  Mail,
  Phone,
  Heart,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { useRegistration } from '@/context/registration/useRegistration';

export interface DetailCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
}

const DetailCard = ({ title, value, icon: Icon }: DetailCardProps) => (
  <div
    className="
      flex items-top gap-3
      px-3 py-4
      bg-white/10 rounded-lg border border-white/30
    "
  >
    <Icon size={20} className="shrink-0 text-white" />

    <div className="min-w-0">
      <h4 className="leading-none font-medium text-white text-sm">{title}</h4>

      <p className="mt-0.5 text-sm truncate text-white/80">{value || '-'}</p>
    </div>
  </div>
);

export function ConfirmDetails() {
  const { state } = useRegistration();

  return (
    <>
      <h2 className="font-semibold text-white text-2xl">Confirm Details</h2>

      <p className="mt-0.5 text-sm text-white/80">
        Review your details before submitting.
      </p>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <DetailCard
          title="Full Name"
          value={`${state.formData.firstName} ${state.formData.lastName}`}
          icon={User}
        />

        <DetailCard title="Gender" value={state.formData.gender} icon={Heart} />

        <DetailCard
          title="Date of Birth"
          value={`${state.formData.dob.day}/${state.formData.dob.month}/${state.formData.dob.year}`}
          icon={Calendar}
        />

        <DetailCard
          title="Profile For"
          value={state.formData.profileFor}
          icon={Users}
        />

        <DetailCard
          title="Religion"
          value={state.formData.religion}
          icon={Heart}
        />

        <DetailCard
          title="Community"
          value={state.formData.community}
          icon={Heart}
        />

        <DetailCard title="Email" value={state.formData.email} icon={Mail} />

        <DetailCard title="Mobile" value={state.formData.mobile} icon={Phone} />
      </div>
    </>
  );
}
