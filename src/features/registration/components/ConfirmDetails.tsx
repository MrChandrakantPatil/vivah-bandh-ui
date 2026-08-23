import { User, Calendar, Mail, Phone, Heart, Users } from 'lucide-react';
import { useRegistration } from '@/context/registration/useRegistration';
import { type DetailCardProps } from '../types';

const DetailCard = ({ title, value, icon: Icon }: DetailCardProps) => (
  <div
    className="
      flex items-top gap-3
      px-3 py-4
      bg-white rounded-lg border border-gray-200
    "
  >
    <Icon size={20} className="shrink-0 text-[rgb(var(--color-primary-500))]" />

    <div className="min-w-0">
      <h4 className="leading-none font-medium text-gray-800 text-sm">
        {title}
      </h4>

      <p className="mt-0.5 text-gray-500 text-sm truncate">{value || '-'}</p>
    </div>
  </div>
);

export function ConfirmDetails() {
  const { state } = useRegistration();

  return (
    <>
      <h2 className="font-semibold text-gray-800 text-2xl">Confirm Details</h2>

      <p className="mt-1 text-gray-500 text-sm">
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
