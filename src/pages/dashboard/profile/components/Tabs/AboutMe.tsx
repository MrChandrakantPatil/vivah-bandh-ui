import { useState } from 'react';
import { ProfileEditActions } from '../ProfileEditActions';
import { useAuth } from '@/features/auth';

export function AboutMe() {
  const { profile } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [aboutMe, setAboutMe] = useState('');

  if (!profile) {
    return null;
  }

  const handleEdit = () => {
    setAboutMe(profile.aboutMe || '');
    setIsEditing(true);
  };

  const handleCancel = () => {
    setAboutMe(profile.aboutMe || '');
    setIsEditing(false);
  };

  const handleSave = () => {
    const updatedAboutMe = aboutMe.trim();

    console.log('Updated About Me:', updatedAboutMe);

    // API call will go here.

    setIsEditing(false);
  };

  return (
    <div className="relative h-full">
      {isEditing ? (
        <textarea
          value={aboutMe}
          onChange={(event) => setAboutMe(event.target.value)}
          placeholder="Tell us something about yourself..."
          rows={8}
          maxLength={1000}
          autoFocus
          className="
            w-full px-4 py-3
            bg-white rounded-xl border border-gray-200
            leading-7 text-[#172554] text-base
            transition
            resize-none
            focus:border-pink-400 focus:ring-2 focus:ring-pink-100
            outline-none
          "
        />
      ) : (
        <p className="leading-7 text-[#172554] text-base lg:leading-8">
          {profile.aboutMe || 'Tell us something about yourself.'}
        </p>
      )}

      <ProfileEditActions
        isEditing={isEditing}
        onEdit={handleEdit}
        onCancel={handleCancel}
        onSave={handleSave}
      />
    </div>
  );
}
