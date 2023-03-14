import { ICoach } from '../../../../store/types/users/coach/coachType';
import { instance } from '../../_axiosInstance';

export const coachClientApi = {
  signUpCoach: async (data: ICoach): Promise<number | string> => {
    try {
      const response = await instance().post('/auth/coach/sign-up', data);
      const res = response.data;
      console.log(`[POST: sign_up] create coach -> res data  ${res}`);

      return res;
    } catch (error: any) {
      console.log(
        `[POST: sign_up] create coach -> error message => ${error.message}`
      );
      throw error;
    }
  },

  coachAccountConfirmation: async (token: string): Promise<number | string> => {
    try {
      const response = await instance().get(
        `/auth/coach/account-confirmation?${token}`
      );
      const res = response.data;
      console.log(`[GET: account-confirmation] coach -> res data  ${res}`);
      return res;
    } catch (error: any) {
      console.log(
        `[GET: account-confirmation] coach -> error message => ${error.message}`
      );
      throw error.message;
    }
  },

  checkCoach: async (): Promise<true> => {
    try {
      const response = await instance().get('/whoami/coach');
      const res = response.data;
      console.log(`[GET] check coach -> res data  ${res}`);
      return res;
    } catch (error: any) {
      console.log(`[GET] check coach -> error message => ${error.message}`);
      throw error;
    }
  },

  coachGetProfile: async (): Promise<any> => {
    try {
      const response = await instance().get('/profile/coach');
      const res = response.data;
      console.log(`[GET: get profile] coach -> res data  ${res}`);
      return res;
    } catch (error: any) {
      console.log(
        `[GET: get profile] coach -> error message => ${error.message}`
      );
      throw error;
    }
  },
};
