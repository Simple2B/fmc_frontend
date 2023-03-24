import { IContacts, IMessages } from '@/store/types/message/messsageType';
import { ICoach } from '../../../../store/types/users/coach/coachType';
import { applicationInstance, instance } from '../../_axiosInstance';

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
      const response = await applicationInstance().get(
        `/auth/coach/account-confirmation/${token}`
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

  checkCoach: async (): Promise<boolean> => {
    try {
      const response = await instance().get('/whoami/coach');
      const res = response.data;
      console.log(`[GET] check coach -> res data  ${res}`);
      return res;
    } catch (error: any) {
      console.log(
        `[GET] check coach -> error message => ${error.response.status}`
      );
      throw error.response.status;
    }
  },

  coachGetProfile: async (): Promise<any> => {
    try {
      const response = await instance().get('/profile/coach');
      const res = response.data;
      console.log(`[GET: get profile] coach -> res data  ${res}`);
      return res;
    } catch (error: any) {
      console.log(`[GET: get profile] coach -> error message => ${error}`);
      throw error;
    }
  },

  coachForgotPassword: async (data: { email: string }): Promise<string> => {
    try {
      const response = await applicationInstance().post(
        '/auth/coach/forgot-password',
        data
      );
      const res = response.data;
      console.log(`[POST: ForgotPassword] coach -> res   ${response}`);
      return res;
    } catch (error: any) {
      console.log(
        `[POST: ForgotPassword] coach -> error message => ${error.message}`
      );
      throw error.message;
    }
  },

  coachResetPassword: async (
    data: { password: string; password1: string },
    verification_token: string
  ): Promise<string> => {
    try {
      const response = await applicationInstance().post(
        `/auth/coach/reset-password/${verification_token}`,
        data
      );
      const res = response.data;
      console.log(`[POST: coachResetPassword] coach -> res   ${response}`);
      return res;
    } catch (error: any) {
      console.log(
        `[POST: coachResetPassword] coach -> error message => ${error.message}`
      );
      throw error.message;
    }
  },

  // MESSAGES ROUTES
  coachContactList: async (): Promise<IContacts> => {
    try {
      const response = await instance().get('/message/coach/list-of-contacts');
      const res = response.data;
      console.log('[GET] coach list of contacts ->', res);
      return res;
    } catch (error: any) {
      console.log(`[GET: ] coach -> error message => ${error.message}`);
      throw error.message;
    }
  },

  coachGetMessageStudent: async (student_uuid: string): Promise<IMessages> => {
    try {
      const response = await instance().get(
        `/message/coach/messages/${student_uuid}`
      );
      const res = response.data;
      console.log('[GET] coach messages with student:->', student_uuid);
      return res;
    } catch (error: any) {
      console.log(`[GET: ] coach -> error message => ${error.message}`);
      throw error.message;
    }
  },

  coachSendMessageStudent: async (data: {
    receiver_id: string;
    text: string;
  }) => {
    try {
      const response = await instance().post(`/message/coach/create`, data);
      const res = response.data;
      console.log('[POST] coach send message to :->', data.receiver_id);
      return res;
    } catch (error: any) {
      console.log(`[POST: ] coach -> error message => ${error.message}`);
      throw error.message;
    }
  },
};
