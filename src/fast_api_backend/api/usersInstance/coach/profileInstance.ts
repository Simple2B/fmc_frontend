import { ILocation, ISport } from '@/store/types/users/coach/profileType';
import { instance, instanceFormData } from '../../_axiosInstance';

const formatPersonalInfoRequestBody = (
  first_name: string,
  last_name: string,
  file: File | null
) => {
  const formData = new FormData();
  formData.append('grant_type', '');
  if (file) formData.append('file', file);
  formData.append('first_name', first_name);
  formData.append('last_name', last_name);
  formData.append('scope', '');
  formData.append('client_id', '');
  formData.append('client_secret', '');
  return formData;
};

const formatProfileInfoRequestBody = (
  sport_category: string,
  about: string,
  certificates: File[],
  is_for_adult: string,
  is_for_children: string,
  locations: ILocation[]
) => {
  const formData = new FormData();
  formData.append('grant_type', '');
  formData.append('sport_category', sport_category);
  formData.append('about', about);
  for (let i = 0; i < certificates.length; i++) {
    formData.append('certificates', certificates[i]);
  }
  formData.append('is_for_adult', is_for_adult);
  formData.append('is_for_children', is_for_children);
  formData.append('locations', JSON.stringify(locations));
  formData.append('scope', '');
  formData.append('client_id', '');
  formData.append('client_secret', '');
  return formData;
};

export const coachProfileApi = {
  savePersonalInfoCoach: async (
    first_name: string,
    last_name: string,
    file: File | null
  ): Promise<string> => {
    try {
      const response = await instanceFormData().post(
        '/profile/coach/personal-info',
        formatPersonalInfoRequestBody(first_name, last_name, file)
      );
      const res = response.data;
      console.log(`[POST: /coach/personal-info] -> res data  ${res}`);
      return res;
    } catch (error: any) {
      console.log(
        `[POST: /coach/personal-info] -> error message => ${error.message}`
      );
      throw error;
    }
  },

  changePasswordCoach: async (data: {
    new_password: string;
    new_password_confirmation: string;
    old_password: string;
  }): Promise<string> => {
    try {
      const response = await instance().post(
        '/profile/coach/change-password',
        data
      );
      const res = response.data;
      console.log(`[POST: /change-password] create coach -> res data  ${res}`);
      return res;
    } catch (error: any) {
      console.log(
        `[POST: /change-password] create coach -> error message => ${error.message}`
      );
      throw error.message;
    }
  },

  getTypeSports: async (): Promise<ISport[]> => {
    try {
      const response = await instance().get('/sports/types');
      const res = response.data;
      console.log(`[GET] type of sports -> res data  ${res}`);
      return res.sport_types;
    } catch (error: any) {
      console.log(`[GET] type of sports -> error message => ${error.message}`);
      throw error;
    }
  },
  updateProfileCoach: async (
    sport_category: string,
    about: string,
    certificates: File[],
    is_for_adult: string,
    is_for_children: string,
    locations: ILocation[]
  ): Promise<string> => {
    try {
      const response = await instanceFormData().post(
        '/profile/coach/profile-info',
        formatProfileInfoRequestBody(
          sport_category,
          about,
          certificates,
          is_for_adult,
          is_for_children,
          locations
        )
      );
      const res = response.data;
      console.log(`[POST: /coach/profile-info] -> res data  ${res}`);
      return res;
    } catch (error: any) {
      console.log(
        `[POST: /coach/profile-info] -> error message => ${error.message}`
      );
      throw error;
    }
  },
};
