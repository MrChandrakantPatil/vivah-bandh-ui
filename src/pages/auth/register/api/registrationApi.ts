import { apiClient } from '@/api/client';
import { isApiError } from '@/api/error';

interface RegistrationPayload {
  profileFor: string;
  gender: string;
  name: string;
  dob: Date;
  religion: string;
  community: string;
  email: string;
  mobile: string;
  password: string;
}

export async function registerProfile(payload: RegistrationPayload) {
  try {
    const response = await apiClient.post('/auth/register', payload);

    return response.data;
  } catch (error: unknown) {
    if (isApiError(error)) {
      throw new Error(
        error.response?.data?.message ??
          'Something went wrong. Please try again.',
        { cause: error },
      );
    }

    throw new Error('Something went wrong. Please try again.', {
      cause: error,
    });
  }
}
