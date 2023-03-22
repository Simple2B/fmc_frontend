import { instance, instanceFormData } from '../../_axiosInstance';

const formatRequestBody = (
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

export const coachProfileApi = {
  savePersonalInfoCoach: async (
    first_name: string,
    last_name: string,
    file: File | null
  ): Promise<string> => {
    try {
      const response = await instanceFormData().post(
        '/profile/coach/personal-info',
        formatRequestBody(first_name, last_name, file)
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
};
