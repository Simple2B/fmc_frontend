import { IUserProfile } from '@/store/types/user';
import { instance, instanceFormData } from '../../_axiosInstance';

const formatRequestBody = (
  first_name: string,
  last_name: string,
  file: File
) => {
  const formData = new FormData();
  formData.append('grant_type', '');
  formData.append('file', file);
  formData.append('first_name', first_name);
  formData.append('last_name', last_name);
  formData.append('scope', '');
  formData.append('client_id', '');
  formData.append('client_secret', '');
  return formData;
};

export const studentProfileApi = {
  savePersonalInfoStudent: async (
    first_name: string,
    last_name: string,
    file: File
  ): Promise<string> => {
    try {
      const response = await instanceFormData().post(
        '/profile/student/personal-info',
        formatRequestBody(first_name, last_name, file)
      );
      const res = response.data;
      console.log(`[POST: /student/personal-info] -> res data  ${res}`);
      return res;
    } catch (error: any) {
      console.log(
        `[POST: /student/personal-info] -> error message => ${error.message}`
      );
      throw error;
    }
  },

  changePasswordStudent: async (data: {
    new_password: string;
    new_password_confirmation: string;
    old_password: string;
  }): Promise<string> => {
    try {
      const response = await instance().post(
        '/profile/student/change-password',
        data
      );
      const res = response.data;
      console.log(
        `[POST: /change-password] create student -> res data  ${res}`
      );
      return res;
    } catch (error: any) {
      console.log(
        `[POST: /change-password] create student -> error message => ${error.message}`
      );
      throw error.message;
    }
  },

  getProfile: async (): Promise<IUserProfile> => {
    try {
      const response = await instance().get('/profile/student');
      const res = response.data;
      console.log(`[GET] profile student -> res data  ${res}`);
      return res;
    } catch (error: any) {
      console.log(`[GET] profile student -> error message => ${error.message}`);
      throw error.message;
    }
  },
};
