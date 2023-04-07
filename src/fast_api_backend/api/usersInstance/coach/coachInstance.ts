import { IPackageSchedule } from '@/store/types/coach_package/packageTypes';
import { IContact, IMessages } from '@/store/types/message/messageType';
import { IUserProfile } from '@/store/types/user';
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

  coachGetProfile: async (): Promise<IUserProfile> => {
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
  // eslint-disable-next-line no-undef
  coachContactList: async (): Promise<IContact[]> => {
    try {
      const response = await instance().get('/message/coach/list-of-contacts');
      const res = response.data;
      console.log('[GET] coach list of contacts ->', res);
      return res.contacts;
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

  coachReadMessageStudent: async (student_uuid: string) => {
    try {
      const response = await instance().post(
        `/message/coach/messages/${student_uuid}/read`
      );
      const res = response.data;
      console.log('[POST] coach read messages with student:->', student_uuid);
      return res;
    } catch (error: any) {
      console.log(`[POST: ] student -> error message => ${error.message}`);
      throw error.message;
    }
  },

  coachGetLocations: async (): Promise<
    {
      id: number;
      uuid: string;
      name: string | null;
      city: string;
      street: string;
      postal_code: string;
    }[]
  > => {
    try {
      const response = await instance().get('/profile/coach/locations/info');
      const res = response.data;
      console.log(`[GET: locations] coach -> res data  ${res}`);
      return res.locations;
    } catch (error: any) {
      console.log(`[GET: locations] coach -> error message => ${error}`);
      throw error;
    }
  },

  coachGetSports: async (): Promise<
    {
      id: number;
      uuid: string;
      name: string;
    }[]
  > => {
    try {
      const response = await instance().get('/profile/coach/sports/info');
      const res = response.data;
      console.log(`[GET: sports] coach -> res data  ${res}`);
      return res.sport_types;
    } catch (error: any) {
      console.log(`[GET: sports] coach -> error message => ${error}`);
      throw error;
    }
  },

  coachGetPackages: async (): Promise<IPackageSchedule[]> => {
    try {
      const response = await instance().get('/package/packages');
      const res = response.data;
      console.log(`[GET: Packages] coach -> res data  ${res}`);
      return res.lessons;
    } catch (error: any) {
      console.log(`[GET: Packages] coach -> error message => ${error}`);
      throw error;
    }
  },
};
