import { IStudent } from '../../../../store/types/users/student/studentType';
import { instance } from '../../_axiosInstance';

export const studentClientApi = {
  signUpStudent: async (data: IStudent): Promise<number | string> => {
    try {
      const response = await instance().post('/auth/student/sign-up', data);
      const res = response.data;
      console.log(`[POST: sign_up] create student -> res data  ${res}`);
      return res;
    } catch (error: any) {
      console.log(
        `[POST: sign_up] create student -> error message => ${error.message}`
      );
      throw error;
    }
  },

  studentAccountConfirmation: async (): Promise<number | string> => {
    try {
      const response = await instance().get(
        '/auth/student/account-confirmation?token'
      );
      const res = response.data;
      console.log(`[GET: account-confirmation] student -> res data  ${res}`);
      return res;
    } catch (error: any) {
      console.log(
        `[GET: account-confirmation] student -> error message => ${error.message}`
      );
      throw error;
    }
  },

  checkStudent: async (): Promise<true> => {
    try {
      const response = await instance().get('');
      const res = response.data;
      console.log(`[GET] check student -> res data  ${res}`);
      return res;
    } catch (error: any) {
      console.log(`[GET] check student -> error message => ${error.message}`);
      throw error;
    }
  },

  studentGetProfile: async (): Promise<any> => {
    try {
      const response = await instance().get('');
      const res = response.data;
      console.log(`[GET: get profile] student -> res data  ${res}`);
      return res;
    } catch (error: any) {
      console.log(
        `[GET: get profile] student -> error message => ${error.message}`
      );
      throw error;
    }
  },
};
