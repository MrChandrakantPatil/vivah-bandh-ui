import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Sparkles } from 'lucide-react';
import { hobbiesOptions } from '@/constants';
import { useProfile } from '@/features/profile';
import { updateProfileApi } from '../api';
import { useProfileEditor } from '../useProfileEditor';
import {
  areProfileDraftsEqual,
  getProfileValue,
  getProfileSectionSuccessMessage,
  getHobbyValues,
  buildHobbiesPayload,
} from '../utils';
import { ProfileEditDrawer, ProfileSectionCard } from '../components';

const MAX_HOBBIES = 5;

const categoryLabels: Record<string, string> = {
  creative: 'Creative',
  fun: 'Fun & Entertainment',
  fitness: 'Fitness & Outdoors',
  otherInterests: 'Other Interests',
};

const hobbyOptions = Object.values(hobbiesOptions).flat();

const SECTION_TITLE = 'Hobbies & Interests';

export function HobbiesAndInterests() {
  const { profile, updateProfileData } = useProfile();
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [selectionError, setSelectionError] = useState<string | null>(null);
  const sectionEndRef = useRef<HTMLDivElement>(null);
  const countStartRef = useRef<HTMLDivElement>(null);
  const [isCountSticky, setIsCountSticky] = useState(false);

  useEffect(() => {
    if (selectionError) {
      sectionEndRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [selectionError]);

  const selectionErrorTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  useEffect(
    () => () => {
      if (selectionErrorTimer.current)
        clearTimeout(selectionErrorTimer.current);
    },
    [],
  );

  const clearSelectionError = () => {
    if (selectionErrorTimer.current) clearTimeout(selectionErrorTimer.current);
    selectionErrorTimer.current = null;
    setSelectionError(null);
  };

  const { isEditing, editValues, handleEdit, handleClose, handleValueChange } =
    useProfileEditor(profile);

  useEffect(() => {
    if (!isEditing || !countStartRef.current) return;

    const marker = countStartRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => setIsCountSticky(!entry.isIntersecting),
      { root: marker.parentElement?.parentElement, threshold: 0 },
    );

    observer.observe(marker);

    return () => observer.disconnect();
  }, [isEditing]);

  const savedValues = getHobbyValues(getProfileValue(profile, 'hobbies'));
  const draftValues = getProfileValue(editValues, 'hobbies');

  const selectedValues = getHobbyValues(draftValues);
  const hasChanges = !areProfileDraftsEqual(savedValues, selectedValues);

  const groups = Object.entries(hobbiesOptions)
    .map(([key, options]) => ({
      key,
      label: categoryLabels[key] ?? key,
      options,
    }))
    .filter((group) => group.options.length);

  const closeDrawer = () => {
    if (isSaving) return;
    setSaveError(null);
    clearSelectionError();
    handleClose();
  };

  const saveHobbies = async () => {
    if (isSaving || !hasChanges) return;

    if (selectedValues.length > MAX_HOBBIES) {
      setSaveError(`Select no more than ${MAX_HOBBIES} hobbies and interests.`);
      return;
    }

    clearSelectionError();
    setIsSaving(true);
    setSaveError(null);
    try {
      const response = await updateProfileApi({
        hobbies: buildHobbiesPayload(selectedValues, hobbiesOptions),
      });

      if (!response.success)
        throw new Error(
          response.message || 'Failed to save hobbies and interests.',
        );

      updateProfileData(response.data);
      handleClose();
      toast.success(getProfileSectionSuccessMessage(SECTION_TITLE));
    } catch (error) {
      setSaveError(
        error instanceof Error
          ? error.message
          : 'Failed to save hobbies and interests.',
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (!profile) return null;

  return (
    <>
      <ProfileSectionCard
        title={SECTION_TITLE}
        icon={Sparkles}
        onEdit={handleEdit}
      >
        {Array.isArray(savedValues) && savedValues.length ? (
          <div className="flex flex-wrap gap-2">
            {savedValues.map((value) => {
              const option = hobbyOptions.find(
                (option) => option.value === value,
              );

              const HobbyIcon = option?.icon ?? Sparkles;

              return (
                <span
                  key={String(value)}
                  className="
                    inline-flex items-center gap-1.5
                    px-3 py-1.5
                    bg-transparent rounded-full border border-slate-200
                    font-medium text-slate-700 text-sm
                  "
                >
                  <HobbyIcon
                    size={15}
                    strokeWidth={1.75}
                    className="shrink-0 text-[#b64792]"
                    aria-hidden="true"
                  />
                  {option?.label ?? String(value)}
                </span>
              );
            })}
          </div>
        ) : (
          <p className="text-slate-500 text-sm">
            Add your hobbies and interests.
          </p>
        )}
      </ProfileSectionCard>

      <ProfileEditDrawer
        isOpen={isEditing}
        icon={Sparkles}
        title={SECTION_TITLE}
        description="Share what you enjoy doing."
        isSaving={isSaving}
        error={saveError}
        onClose={closeDrawer}
        onCancel={closeDrawer}
        onSave={saveHobbies}
        saveDisabled={!hasChanges}
      >
        <div className="pb-4">
          <div ref={countStartRef} className="h-px" aria-hidden="true" />

          <div
            className="
              sticky top-0 z-10
              flex justify-center
              py-3 mb-2
              pointer-events-none
            "
          >
            <p
              role="status"
              className={`
                inline-flex items-center justify-center gap-2.5
                px-3 py-2
                bg-pink-50 border border-pink-200
                ${
                  isCountSticky
                    ? 'w-fit rounded-full shadow-[0_2px_8px_rgba(15,23,42,0.06)]'
                    : 'w-full rounded-xl'
                }
              `}
            >
              <span
                className="
                  px-2.5 py-1
                  bg-white rounded-full
                  font-bold text-[#b64792] text-xs
                  tabular-nums
                "
              >
                {selectedValues.length} / {MAX_HOBBIES}
              </span>

              <span className="pr-1 font-medium text-slate-600 text-xs">
                Hobbies selected
              </span>
            </p>
          </div>

          <div className="space-y-5">
            {groups.map((group) => (
              <section
                key={group.key}
                aria-label={group.label}
                className="
                  px-4 py-3
                  bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)] rounded-xl border border-slate-200/80
                "
              >
                <h3 className="mb-4 font-bold text-slate-700 text-base">
                  {group.label}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {group.options.map((option) => {
                    const selected = selectedValues.includes(option.value);
                    const HobbyIcon = option.icon;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        aria-pressed={selected}
                        disabled={isSaving}
                        onClick={() => {
                          if (isSaving) return;
                          if (
                            !selected &&
                            selectedValues.length >= MAX_HOBBIES
                          ) {
                            if (selectionErrorTimer.current)
                              clearTimeout(selectionErrorTimer.current);
                            sectionEndRef.current?.scrollIntoView({
                              behavior: 'smooth',
                              block: 'end',
                            });
                            setSelectionError(
                              `You can select up to ${MAX_HOBBIES} hobbies and interests.`,
                            );
                            selectionErrorTimer.current = setTimeout(() => {
                              setSelectionError(null);
                              selectionErrorTimer.current = null;
                            }, 5000);
                            return;
                          }
                          clearSelectionError();
                          setSaveError(null);
                          handleValueChange(
                            'hobbies',
                            selected
                              ? selectedValues.filter(
                                  (value) => value !== option.value,
                                )
                              : [...selectedValues, option.value],
                          );
                        }}
                        className={`
                          inline-flex items-center gap-1.5
                          px-3 py-2
                          rounded-full border
                          text-sm
                          transition
                          disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2
                          ${
                            selected
                              ? 'bg-[#b64792] border-[#b64792] text-white hover:bg-[#a23b81]'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-pink-50 hover:border-pink-200'
                          }
                        `}
                      >
                        <HobbyIcon
                          size={15}
                          strokeWidth={1.75}
                          className={`
                            shrink-0
                            ${selected ? 'text-white' : 'text-[#b64792]'}
                          `}
                          aria-hidden="true"
                        />
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}

            {!groups.length && (
              <p className="py-6 text-slate-400 text-sm text-center">
                No hobbies or interests available.
              </p>
            )}
          </div>
        </div>

        {selectionError && (
          <>
            <p role="alert" className="mt-2 text-red-600 text-xs">
              {selectionError}
            </p>
            
            <div ref={sectionEndRef} className="h-6" aria-hidden="true" />
          </>
        )}
      </ProfileEditDrawer>
    </>
  );
}
