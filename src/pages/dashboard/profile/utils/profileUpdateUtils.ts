import {
  getProfileFieldValue,
  isProfileValueEmpty,
  validateProfileCustomValue,
} from './profileFieldUtils';
import type {
  ProfileFieldDraftValue,
  ProfileViewFieldConfig,
  UpdateProfilePayload,
} from '../types';

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

// Build nested patches without resending unchanged siblings or legacy values.
function setValue(
  target: Record<string, unknown>,
  parts: string[],
  value: unknown,
) {
  const [key, ...rest] = parts;

  if (!rest.length) {
    target[key] = value;
    return;
  }

  const child = isRecord(target[key]) ? { ...target[key] } : {};

  setValue(child, rest, value);
  target[key] = child;
}

export function validateProfileSection(
  fields: ProfileViewFieldConfig[],
  values: unknown,
): string | null {
  for (const field of fields) {
    const value = getProfileFieldValue(field, values);
    
    if (field.required && isProfileValueEmpty(value))
      return `${field.label} is required.`;
    
    if (['text', 'number', 'date', 'time'].includes(field.type ?? '')) {
      const customValue =
        field.type === 'date' && typeof value === 'string'
          ? value.slice(0, 10)
          : String(value ?? '');
      
      const error = validateProfileCustomValue(field, customValue);
      
      if (error) return error;
    }
  }

  return null;
}

export function buildProfileUpdatePayload(
  drafts: Record<string, ProfileFieldDraftValue>,
  fields: ProfileViewFieldConfig[],
  rootKey?: 'partnerPreferences',
): UpdateProfilePayload {
  const allowedKeys = new Set(
    fields.flatMap((field) =>
      field.type === 'range'
        ? [field.minKey, field.maxKey].filter((key): key is string =>
            Boolean(key),
          )
        : [field.key],
    ),
  );

  const numericKeys = new Set([
    'height',
    'familyDetails.brothers',
    'familyDetails.sisters',
    'basicDetails.minAge',
    'basicDetails.maxAge',
    'basicDetails.minHeight',
    'basicDetails.maxHeight',
    ...fields
      .filter((field) => field.type === 'number')
      .map((field) => field.key),
  ]);

  const payload: Record<string, unknown> = {};

  for (const [key, draft] of Object.entries(drafts)) {
    if (!allowedKeys.has(key)) continue;

    const parts = key.split('.');
    
    let value: unknown = typeof draft === 'string' ? draft.trim() : draft;
    
    if (value === '') value = null;
    
    if (numericKeys.has(key) && value !== null) {
      value = Number(value);
      if (!Number.isFinite(value)) throw new Error('Enter a valid number.');
    }
    
    setValue(payload, parts, value);
  }
  
  if (!Object.keys(payload).length) return {};
  
  return (rootKey ? { [rootKey]: payload } : payload) as UpdateProfilePayload;
}

export function getProfileSectionSuccessMessage(title: string): string {
  return `${title.charAt(0).toUpperCase()}${title.slice(1).toLowerCase()} updated successfully`;
}
