import { useState } from 'react';
import { toast } from 'sonner';
import { Heart } from 'lucide-react';
import { useProfile } from '@/features/profile';
import { updateProfileApi } from '../api';
import { getProfileSectionSuccessMessage } from '../utils';
import { ProfileSectionCard, ProfileEditDrawer } from '../components';

const SECTION_TITLE = 'About Me';

export function AboutMe() {
  const { profile, updateProfileData } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [aboutMe, setAboutMe] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  if (!profile) return null;

  const handleEdit = () => {
    if (isSaving) return;
    setAboutMe(profile.aboutMe || '');
    setSaveError(null);
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (isSaving) return;
    setAboutMe(profile.aboutMe || '');
    setSaveError(null);
    setIsEditing(false);
  };

  const hasChanges = aboutMe.trim() !== (profile.aboutMe ?? '').trim();

  const handleSave = async () => {
    if (isSaving || !hasChanges) return;
    const updatedAboutMe = aboutMe.trim();

    try {
      setIsSaving(true);
      setSaveError(null);

      const response = await updateProfileApi({
        aboutMe: updatedAboutMe || null,
      });

      if (!response.success) {
        throw new Error(response.message || 'Failed to update About Me');
      }

      updateProfileData(response.data);

      setIsEditing(false);
      toast.success(getProfileSectionSuccessMessage(SECTION_TITLE));
    } catch (error) {
      setSaveError(
        error instanceof Error ? error.message : 'Failed to update About Me',
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <ProfileSectionCard
        title={SECTION_TITLE}
        icon={Heart}
        onEdit={handleEdit}
      >
        <p className="whitespace-pre-line leading-6 text-[#172554] text-sm sm:text-[15px]">
          {profile.aboutMe || 'Tell us something about yourself.'}
        </p>
      </ProfileSectionCard>

      <ProfileEditDrawer
        isOpen={isEditing}
        icon={Heart}
        title={SECTION_TITLE}
        description="Tell us something about yourself."
        isSaving={isSaving}
        error={saveError}
        onClose={handleCancel}
        onCancel={handleCancel}
        onSave={handleSave}
        saveDisabled={!hasChanges}
        contentClassName="px-6 py-4"
      >
        <p className="mb-2 text-gray-400 text-xs text-right">
          {aboutMe.length}/1000
        </p>

        <textarea
          id="about-me"
          value={aboutMe}
          onChange={(event) => {
            setAboutMe(event.target.value);
            setSaveError(null);
          }}
          placeholder="Tell us something about yourself..."
          rows={8}
          maxLength={1000}
          disabled={isSaving}
          className="
            w-full px-3 py-2.5
            bg-white rounded-lg border border-gray-200
            leading-6 text-[#172554] text-sm
            transition
            resize-y
            disabled:opacity-60 focus:border-teal-500 focus:ring-2 focus:ring-teal-100
            outline-none
          "
        />

        <p className="mt-2 leading-5 text-gray-400 text-xs">
          Share details about your personality, interests and expectations.
        </p>
      </ProfileEditDrawer>
    </>
  );
}
