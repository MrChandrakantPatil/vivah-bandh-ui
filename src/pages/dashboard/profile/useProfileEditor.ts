import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';
import { useProfile } from '@/features/profile';
import { updateProfileApi } from './api';
import {
  areProfileDraftsEqual,
  buildProfileUpdatePayload,
  getProfileFieldDraft,
  getProfileSectionSuccessMessage,
  validateProfileSection,
} from './utils';
import type { ProfileFieldDraftValue, ProfileViewFieldConfig } from './types';

interface ProfileEditorOptions {
  sectionTitle: string;
  fields: ProfileViewFieldConfig[];
  rootKey?: 'partnerPreferences';
}

export function useProfileEditor(
  values: unknown,
  options?: ProfileEditorOptions,
) {
  const { updateProfileData } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const savingRef = useRef(false);
  const [draftValues, setDraftValues] = useState<
    Record<string, ProfileFieldDraftValue>
  >({});

  const editValues = {
    ...(values && typeof values === 'object' ? values : {}),
    ...draftValues,
  };

  const hasChanges =
    options?.fields.some(
      (field) =>
        !areProfileDraftsEqual(
          getProfileFieldDraft(field, values),
          getProfileFieldDraft(field, editValues),
        ),
    ) ?? false;

  const handleValueChange = (key: string, value: ProfileFieldDraftValue) => {
    if (savingRef.current) return;
    setSaveError(null);
    setDraftValues((previous) => ({ ...previous, [key]: value }));
  };

  const handleEdit = () => {
    if (savingRef.current) return;
    setDraftValues({});
    setSaveError(null);
    setIsOptionsOpen(false);
    setIsEditing(true);
  };

  const handleClose = () => {
    if (savingRef.current) return;
    setDraftValues({});
    setSaveError(null);
    setIsOptionsOpen(false);
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (savingRef.current || !options || !hasChanges) return;

    const validationError = validateProfileSection(options.fields, editValues);

    if (validationError) {
      setSaveError(validationError);
      return;
    }

    try {
      const payload = buildProfileUpdatePayload(
        draftValues,
        options.fields,
        options.rootKey,
      );

      if (!Object.keys(payload).length) {
        handleClose();
        return;
      }

      savingRef.current = true;
      setIsSaving(true);
      setSaveError(null);
      const response = await updateProfileApi(payload);

      if (!response.success || !response.data)
        throw new Error(response.message || 'Failed to save profile details.');

      updateProfileData(response.data);
      setDraftValues({});
      setIsOptionsOpen(false);
      setIsEditing(false);

      toast.success(getProfileSectionSuccessMessage(options.sectionTitle));
    } catch (error) {
      const apiMessage = isAxiosError<{ message?: string }>(error)
        ? error.response?.data?.message
        : undefined;

      setSaveError(
        apiMessage ||
          (error instanceof Error
            ? error.message
            : 'Failed to save profile details. Please try again.'),
      );
    } finally {
      savingRef.current = false;
      setIsSaving(false);
    }
  };

  return {
    isEditing,
    hasChanges,
    isOptionsOpen,
    setIsOptionsOpen,
    editValues,
    setDraftValues,
    isSaving,
    saveError,
    handleSave,
    handleEdit,
    handleClose,
    handleValueChange,
  };
}
