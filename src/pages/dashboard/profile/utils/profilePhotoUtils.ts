export const DEFAULT_MALE_PHOTO = '/images/profile/male.png';
export const DEFAULT_FEMALE_PHOTO = '/images/profile/female.png';

export const getDefaultProfilePhoto = (gender?: string | null): string => {
  return gender?.toLowerCase() === 'female'
    ? DEFAULT_FEMALE_PHOTO
    : DEFAULT_MALE_PHOTO;
};

export const getInitials = (name?: string | null): string => {
  if (!name?.trim()) return 'NA';

  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
};

export function releasePhotoPreviews(photos: { previewUrl: string }[]) {
  photos.forEach((photo) => URL.revokeObjectURL(photo.previewUrl));
}
