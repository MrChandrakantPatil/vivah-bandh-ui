import { apiClient } from '@/api/client';
import type { UpdateProfilePayload, UpdateProfileResponse } from './types';
import type { Profile } from '@/types/profile.types';
import type { ApiResponse } from '@/api/types';

export type PhotoUploadRequest = {
  files: {
    contentType: string;
    fileSize: number;
  }[];
};

export type PresignedPhotoUpload = {
  uploadUrl: string;
  key: string;
  expiresIn: number;
};

export type PhotoUploadUrlsResponse = {
  success: boolean;
  message: string;
  data: {
    uploads: PresignedPhotoUpload[];
  };
};

export type DeleteProfilePhotoResponse = {
  success: boolean;
  message: string;
  data: {
    profilePhotos: string[];
    primaryPhoto: string | null;
  };
};

export const getProfileApi = async (): Promise<ApiResponse<Profile>> => {
  const response = await apiClient.get<ApiResponse<Profile>>('/profile');

  return response.data;
};

export const updateProfileApi = async (
  payload: UpdateProfilePayload,
): Promise<UpdateProfileResponse> => {
  const response = await apiClient.patch<UpdateProfileResponse>(
    '/profile',
    payload,
  );

  return response.data;
};

export const requestPhotoUploadUrlsApi = async (
  payload: PhotoUploadRequest,
): Promise<PhotoUploadUrlsResponse> => {
  const response = await apiClient.post<PhotoUploadUrlsResponse>(
    '/profile/photos/presign-url',
    payload,
  );

  return response.data;
};

export async function uploadProfilePhotos(files: File[]) {
  if (!files.length) {
    throw new Error('Please select at least one photo.');
  }

  const result = await requestPhotoUploadUrlsApi({
    files: files.map((file) => ({
      contentType: file.type,
      fileSize: file.size,
    })),
  });

  const uploads = result.data?.uploads;

  if (!result.success || !uploads || uploads.length !== files.length) {
    throw new Error('Failed to generate photo upload URLs.');
  }

  return Promise.all(
    files.map(async (file, index) => {
      const upload = uploads[index];

      const response = await fetch(upload.uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      });

      if (!response.ok) {
        throw new Error(`Failed to upload ${file.name} to S3.`);
      }

      return {
        key: upload.key,
        file,
      };
    }),
  );
}

export const deleteProfilePhotoApi = async (
  photoKey: string,
): Promise<DeleteProfilePhotoResponse> => {
  const response = await apiClient.delete<DeleteProfilePhotoResponse>(
    '/profile/photos',
    {
      data: {
        photoKey,
      },
    },
  );

  return response.data;
};
