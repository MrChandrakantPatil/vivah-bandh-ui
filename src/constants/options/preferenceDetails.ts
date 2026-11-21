import { addOpenToAllOption } from '../helper';

import { maritalStatusOptions } from './maritalDetails';
import { motherTongueOptions } from './launguageDetails';
import { religionOptions, communityOptions } from './religiousDetails';
import { countryOptions, stateOptions, cityOptions } from './locationDetails';
import { profileManagedByOptions } from './profileDetails';
import { dietCategoryOptions } from './basicDetails';
import { qualificationCategoryOptions } from './qualificationDetails';
import { workingSectorOptions } from './careerDetails';
import { professionCategoryOptions } from './careerDetails';

export const preferenceMaritalStatusOptions =
  addOpenToAllOption(maritalStatusOptions);
export const preferenceReligionOptions = addOpenToAllOption(religionOptions);
export const preferenceCommunityOptions = addOpenToAllOption(communityOptions);
export const preferenceMotherTongueOptions =
  addOpenToAllOption(motherTongueOptions);
export const preferenceCountryOptions = addOpenToAllOption(countryOptions);
export const preferenceStateOptions = addOpenToAllOption(stateOptions);
export const preferenceCityOptions = addOpenToAllOption(
  stateOptions
    .filter(({ value }) => cityOptions[value]?.length)
    .map(({ label, value }) => ({ label, value, options: cityOptions[value] })),
);
export const preferenceQualificationOptions = addOpenToAllOption(
  qualificationCategoryOptions,
);
export const preferenceWorkingSectorOptions =
  addOpenToAllOption(workingSectorOptions);
export const preferenceProfessionOptions = addOpenToAllOption(
  professionCategoryOptions,
);
export const preferenceProfileOptions = addOpenToAllOption(
  profileManagedByOptions,
);
export const preferenceDietOptions = addOpenToAllOption(dietCategoryOptions);
