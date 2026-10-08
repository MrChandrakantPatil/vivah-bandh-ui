import { useState } from 'react';
import { Pencil, Save, UserRound, X } from 'lucide-react';

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
    <>
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div
            className="
              flex items-center justify-center
              w-12 h-12
              bg-pink-50 rounded-full
              text-pink-500
            "
          >
            <UserRound size={24} />
          </div>

          <div>
            <h2 className="font-bold text-[#172554] text-xl lg:text-2xl">
              About Me
            </h2>

            <p className="mt-1 text-gray-500 text-sm">
              Share a few words about yourself
            </p>
          </div>
        </div>

        {!isEditing ? (
          <button
            type="button"
            onClick={handleEdit}
            className="
              flex items-center gap-2
              px-4 py-2
              rounded-lg border border-pink-300
              font-medium text-pink-500 text-sm
              transition
              hover:bg-pink-50
            "
          >
            <Pencil size={16} />
            Edit
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="
                flex items-center gap-2
                px-4 py-2
                rounded-lg border border-gray-300
                font-medium text-gray-600 text-sm
                transition
                hover:bg-gray-50
              "
            >
              <X size={16} />
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="
                flex items-center gap-2
                px-4 py-2
                bg-pink-500 rounded-lg
                font-medium text-white text-sm
                transition
                hover:bg-pink-600
              "
            >
              <Save size={16} />
              Save
            </button>
          </div>
        )}
      </div>

      {/* About Me Content */}
      <div className="mt-6">
        {isEditing ? (
          <textarea
            value={aboutMe}
            onChange={(event) => setAboutMe(event.target.value)}
            placeholder="Tell us something about yourself..."
            rows={8}
            maxLength={1000}
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
          <p className="leading-7 text-[#172554] text-base lg:leading-8 lg:text-base">
            {profile.aboutMe || 'Tell us something about yourself.'}
          </p>
        )}
      </div>
    </>
  );
}
