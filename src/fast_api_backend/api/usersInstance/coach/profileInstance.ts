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
  certificates: Blob,
  is_for_adult: string,
  is_for_children: string,
  city: string,
  street: string,
  postal_code: string
) => {
  const formData = new FormData();
  formData.append('grant_type', '');
  formData.append('sport_category', sport_category);
  formData.append('about', about);
  formData.append('certificates', certificates);
  formData.append('is_for_adult', is_for_adult);
  formData.append('is_for_children', is_for_children);
  formData.append('city', city);
  formData.append('street', street);
  formData.append('postal_code', postal_code);
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

  updateProfileCoach: async (
    sport_category: string,
    about: string,
    certificates: Blob,
    is_for_adult: string,
    is_for_children: string,
    city: string,
    street: string,
    postal_code: string
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
          city,
          street,
          postal_code
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
