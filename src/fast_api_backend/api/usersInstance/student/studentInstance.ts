import {
  IStudent,
  IStudentProfile,
} from '../../../../store/types/users/student/studentType';
import { applicationInstance, instance } from '../../_axiosInstance';

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

  studentAccountConfirmation: async (
    token: string
  ): Promise<number | string> => {
    try {
      const response = await applicationInstance().get(
        `/auth/student/account-confirmation?${token}`
      );
      const res = response.data;
      console.log(`[POST: account-confirmation] student -> res data  ${res}`);
      return res;
    } catch (error: any) {
      console.log(
        `[POST: account-confirmation] student -> error message => ${error.message}`
      );
      throw error.message;
    }
  },

  checkStudent: async (): Promise<true> => {
    try {
      const response = await instance().get('/whoami/student');
      const res = response.data;
      console.log(`[GET] check student -> res data  ${res}`);
      return res;
    } catch (error: any) {
      console.log(`[GET] check student -> error message => ${error}`);
      throw error;
    }
  },

  studentGetProfile: async (): Promise<IStudentProfile> => {
    try {
      const response = await instance().get('/profile/student');
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

  studentForgotPassword: async (data: { email: string }): Promise<string> => {
    try {
      const response = await applicationInstance().post(
        '/auth/student/forgot-password',
        data
      );
      const res = response.data;
      console.log(`[POST: ForgotPassword] student -> res   ${response}`);
      return res;
    } catch (error: any) {
      console.log(
        `[POST: ForgotPassword] student -> error message => ${error.message}`
      );
      throw error.message;
    }
  },

  studentResetPassword: async (
    data: { password: string; password1: string },
    verification_token: string
  ): Promise<string> => {
    try {
      const response = await applicationInstance().post(
        `/auth/student/reset-password/${verification_token}`,
        data
      );
      const res = response.data;
      console.log(`[POST: studentResetPassword] student -> res   ${response}`);
      return res;
    } catch (error: any) {
      console.log(
        `[POST: studentResetPassword] student -> error message => ${error.message}`
      );
      throw error.message;
    }
  },
};
