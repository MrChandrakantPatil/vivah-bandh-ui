import { useEffect, useRef, type ReactNode } from 'react';
import { Save, X, type LucideIcon } from 'lucide-react';
import { formatProfileFieldValue, getProfileFieldValue } from '../../utils';
import { ProfileEditField } from '../Fields/ProfileEditField';
import type { ProfileViewFieldConfig, ProfileSectionGroup } from '../../types';

interface ProfileEditDrawerBaseProps {
  isOpen: boolean;
  icon: LucideIcon;
  title: string;
  description?: string;
  isSaving: boolean;
  error?: string | null;
  onClose: () => void;
  onCancel: () => void;
  onSave: () => void;
  saveDisabled: boolean;
  saveLabel?: string;
  contentClassName?: string;
}

type ProfileEditDrawerProps<Field extends ProfileViewFieldConfig> =
  ProfileEditDrawerBaseProps &
    (
      | {
          fields: Field[];
          sections?: never;
          values: unknown;
          onFieldClick: (field: Field) => void;
          children?: never;
        }
      | {
          fields?: never;
          sections: ProfileSectionGroup<Field>[];
          values: unknown;
          onFieldClick: (field: Field) => void;
          children?: never;
        }
      | {
          fields?: never;
          sections?: never;
          values?: never;
          onFieldClick?: never;
          children: ReactNode;
        }
    );

export function ProfileEditDrawer<
  Field extends ProfileViewFieldConfig = ProfileViewFieldConfig,
>({
  isOpen,
  icon: Icon,
  title,
  description = 'Tap on the field to update details.',
  isSaving,
  error,
  onClose,
  onCancel,
  onSave,
  saveDisabled,
  saveLabel = 'Save',
  children,
  fields,
  sections,
  values,
  onFieldClick,
  contentClassName = 'px-6 py-2 sm:px-6',
}: ProfileEditDrawerProps<Field>) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!error) return;

    contentRef.current?.scrollTo({
      top: contentRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [error]);

  const renderFields = (items: Field[]) => (
    <div className="flex flex-col divide-y divide-slate-100">
      {items.map((field) => {
        const value = getProfileFieldValue(field, values);
        
        return (
          <ProfileEditField
            key={field.key}
            label={field.label}
            icon={field.icon}
            required={field.required}
            disabled={isSaving}
            value={value}
            formattedValue={formatProfileFieldValue(field, value)}
            onClick={() => onFieldClick?.(field)}
          />
        );
      })}
    </div>
  );

  return (
    <div
      className={`
        fixed inset-0 z-150
        h-full
        transition-[visibility] duration-0
        ${isOpen ? 'visible delay-0' : 'invisible delay-300'}
      `}
      aria-hidden={!isOpen}
      inert={!isOpen}
    >
      <button
        type="button"
        tabIndex={isOpen ? 0 : -1}
        aria-label="Close editor"
        onClick={onClose}
        disabled={!isOpen || isSaving}
        className={`
          absolute inset-0
          w-full h-full
          bg-black/40
          transition-opacity duration-300 ease-in-out
          backdrop-blur-[2px]
          ${
            isOpen
              ? 'pointer-events-auto opacity-100'
              : 'pointer-events-none opacity-0'
          }
        `}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`
          absolute inset-y-0 right-0
          w-full max-w-md h-full
          bg-white shadow-none
          transition-transform duration-300 ease-in-out
          overflow-hidden
          sm:shadow-2xl
          transform-gpu
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="relative flex flex-col w-full h-full">
          <div
            className="
              relative z-10
              flex items-center justify-between shrink-0
              px-5 py-4
              bg-white shadow-[0_4px_12px_rgba(15,23,42,0.06)] border-b border-slate-200
              sm:px-6
            "
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="
                  flex items-center justify-center shrink-0
                  w-10 h-10
                  bg-teal-50 rounded-xl
                  text-teal-600
                "
              >
                <Icon size={20} strokeWidth={1.8} />
              </div>

              <div className="min-w-0">
                <h2 className="font-bold text-[#172554] text-lg">{title}</h2>

                <p className="mt-0.5 text-gray-500 text-xs">{description}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              aria-label="Close editor"
              className="
                flex items-center justify-center shrink-0
                w-9 h-9 ml-3
                rounded-full
                text-gray-500
                transition
                hover:bg-gray-100 disabled:opacity-50
              "
            >
              <X size={19} />
            </button>
          </div>

          <div className="relative flex-1 min-h-0 overflow-hidden">
            <div
              ref={contentRef}
              className={`
                h-full
                overflow-y-auto overscroll-contain
                ${contentClassName}
              `}
            >
              {sections ? (
                <div className="space-y-4 py-2">
                  {sections
                    .filter((section) => section.fields.length > 0)
                    .map((section) => {
                      const SectionIcon = section.icon;
                      return (
                        <div
                          key={section.key}
                          className="
                            px-4 py-3
                            bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)] rounded-xl border border-slate-200/80
                          "
                        >
                          <div className="flex items-center gap-2 pb-3 mb-1">
                            <SectionIcon
                              size={18}
                              strokeWidth={1.75}
                              className="shrink-0 text-teal-600"
                              aria-hidden="true"
                            />

                            <h3 className="font-bold text-[#172554]">
                              {section.title}
                            </h3>
                          </div>

                          {renderFields(section.fields)}
                        </div>
                      );
                    })}
                </div>
              ) : fields ? (
                <div className="py-2">{renderFields(fields)}</div>
              ) : (
                children
              )}

              {error && (
                <p
                  className="
                    px-3 py-3 mt-2 mb-2
                    bg-red-50 rounded-xl border border-red-100
                    text-red-600 text-xs
                  "
                  role="alert"
                >
                  {error}
                </p>
              )}
            </div>
          </div>

          <div
            className="
              relative z-10
              flex gap-3 shrink-0
              p-4
              bg-white shadow-[0_-4px_12px_rgba(15,23,42,0.06)] border-t border-slate-200
              sm:p-6
            "
          >
            <button
              type="button"
              onClick={onCancel}
              disabled={isSaving}
              className="
                flex-1 flex items-center justify-center gap-3
                px-4 py-3
                bg-white rounded-xl border border-slate-200
                font-semibold text-slate-600 text-sm
                transition
                hover:bg-slate-50 disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              <X size={16} />
              Cancel
            </button>

            <button
              type="button"
              onClick={onSave}
              disabled={isSaving || saveDisabled}
              className="
                flex-1 flex items-center justify-center gap-3
                px-4 py-3
                bg-teal-600 rounded-xl
                font-semibold text-white text-sm
                transition
                hover:bg-teal-700 disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              <Save size={16} />
              {isSaving ? 'Saving...' : saveLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
