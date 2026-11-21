import type { ReactNode } from 'react';
import { Pencil, type LucideIcon } from 'lucide-react';
import { formatProfileFieldValue, getProfileFieldValue } from '../utils';
import { ProfileSectionCard } from './ProfileSectionCard';
import { ProfileViewField } from './Fields/ProfileViewField';
import type { ProfileSectionGroup, ProfileViewFieldConfig } from '../types';

type ProfileViewSectionProps<Field extends ProfileViewFieldConfig> = {
  title: string;
  icon: LucideIcon;
  values: unknown;
  onEdit?: () => void;
  formatValue?: (field: Field, value: unknown) => ReactNode;
  getValue?: (field: Field, values: unknown) => unknown;
} & (
  | { fields: Field[]; sections?: never }
  | { fields?: never; sections: ProfileSectionGroup<Field>[] }
);

export function ProfileViewSection<Field extends ProfileViewFieldConfig>({
  title,
  icon,
  values,
  fields,
  sections,
  onEdit,
  formatValue = formatProfileFieldValue,
  getValue = getProfileFieldValue,
}: ProfileViewSectionProps<Field>) {
  const renderFields = (items: Field[]) => (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {items.map((field) => {
        const value = getValue(field, values);

        return (
          <ProfileViewField
            key={field.key}
            label={field.label}
            icon={field.icon}
            value={value}
            formattedValue={formatValue(field, value)}
          />
        );
      })}
    </div>
  );

  return (
    <ProfileSectionCard title={title} icon={icon} onEdit={onEdit}>
      {sections ? (
        <div className="space-y-4">
          {sections
            .filter((section) => section.fields.length > 0)
            .map((section) => {
              const SectionIcon = section.icon;

              return (
                <div
                  key={section.key}
                  className="
                    px-4 py-4
                    bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)] rounded-xl border border-slate-200/80
                  "
                >
                  <div
                    className="
                      flex items-center justify-between gap-3
                      pb-3 mb-3
                      border-b border-slate-100
                    "
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="
                          flex items-center justify-center shrink-0
                          w-9 h-9
                          bg-gray-100 rounded-xl
                          text-slate-600
                        "
                      >
                        <SectionIcon size={18} strokeWidth={1.75} />
                      </div>

                      <div className="min-w-0">
                        <h3 className="leading-tight font-bold text-[#172554] text-base">
                          {section.title}
                        </h3>

                        <p className="mt-0.5 text-gray-500 text-[11px]">
                          {section.fields.length}{' '}
                          {section.fields.length === 1
                            ? 'preference'
                            : 'preferences'}
                        </p>
                      </div>
                    </div>

                    {onEdit && (
                      <button
                        type="button"
                        onClick={onEdit}
                        aria-label={`Edit ${section.title}`}
                        className="
                          flex items-center justify-center shrink-0
                          w-9 h-9
                          bg-white rounded-full border border-slate-200
                          text-gray-500
                          transition
                          hover:bg-teal-50 hover:border-teal-200 hover:text-teal-600
                        "
                      >
                        <Pencil size={15} strokeWidth={1.8} />
                      </button>
                    )}
                  </div>

                  {renderFields(section.fields)}
                </div>
              );
            })}
        </div>
      ) : (
        renderFields(fields)
      )}
    </ProfileSectionCard>
  );
}
