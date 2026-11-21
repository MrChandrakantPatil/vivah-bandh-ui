import { getProfileValue as getByPath } from './profileFieldUtils';
import type {
  ProfileFieldOption,
  ProfileViewFieldConfig,
  ProfileSectionGroup,
} from '../types';

export function getDependentOptions(
  values: unknown,
  parentKey: string,
  options: ProfileFieldOption[],
): ProfileFieldOption[] {
  const parentValue = getByPath(values, parentKey);

  const selectedParents = Array.isArray(parentValue)
    ? parentValue.map(String)
    : [];

  const allParents = selectedParents.includes('openToAll');

  return options.filter(
    (option) =>
      !option.options ||
      allParents ||
      selectedParents.includes(option.value ?? option.label),
  );
}

export function getVisiblePreferenceSections<
  Field extends ProfileViewFieldConfig,
>(
  sections: ProfileSectionGroup<Field>[],
  values: unknown,
): ProfileSectionGroup<Field>[] {
  const maritalStatuses = getByPath(values, 'basicDetails.maritalStatus');
  
  const onlyNeverMarried =
    Array.isArray(maritalStatuses) &&
    maritalStatuses.length === 1 &&
    maritalStatuses[0] === 'neverMarried';

  return sections
    .map((section) => ({
      ...section,
      fields: section.fields.filter(
        (field) =>
          !onlyNeverMarried || field.key !== 'basicDetails.profileWithChildren',
      ),
    }))
    .filter((section) => section.fields.length > 0);
}
