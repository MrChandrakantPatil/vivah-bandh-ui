import { useState } from 'react';
import { Heart } from 'lucide-react';
import { SectionCard } from '../SectionCard';
import { ProfileEditActions } from '../ProfileEditActions';
import { useProfile } from '@/features/profile';
import { updateProfileApi } from '../../api';

export function AboutMe() {
  const { profile, updateProfileData } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [aboutMe, setAboutMe] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  if (!profile) return null;

  const handleEdit = () => {
    setAboutMe(profile.aboutMe || '');
    setSaveError(null);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setAboutMe(profile.aboutMe || '');
    setSaveError(null);
    setIsEditing(false);
  };

  const handleSave = async () => {
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

      updateProfileData({
        aboutMe: response.data?.aboutMe ?? (updatedAboutMe || null),
      });

      setIsEditing(false);
    } catch (error) {
      setSaveError(
        error instanceof Error ? error.message : 'Failed to update About Me',
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SectionCard
      title="About Me"
      icon={Heart}
      onEdit={handleEdit}
      isEditing={isEditing}
    >
      {isEditing ? (
        <textarea
          value={aboutMe}
          onChange={(event) => setAboutMe(event.target.value)}
          placeholder="Tell us something about yourself..."
          rows={8}
          maxLength={1000}
          autoFocus
          disabled={isSaving}
          className="
            w-full px-4 py-3
            bg-white rounded-xl border border-gray-200
            leading-7 text-[#172554] text-base
            transition
            resize-none
            disabled:opacity-60 focus:border-pink-400 focus:ring-2 focus:ring-pink-100
            outline-none
          "
        />
      ) : (
        <p className="leading-7 text-[#172554] text-base lg:leading-8">
          {profile.aboutMe || 'Tell us something about yourself.'}
        </p>
      )}

      {saveError && (
        <p className="mt-2 text-red-600 text-sm" role="alert">
          {saveError}
        </p>
      )}

      <ProfileEditActions
        isEditing={isEditing}
        onCancel={handleCancel}
        onSave={handleSave}
      />

      {isSaving && (
        <p className="mt-2 text-gray-500 text-sm">Saving changes...</p>
      )}
    </SectionCard>
  );
}
