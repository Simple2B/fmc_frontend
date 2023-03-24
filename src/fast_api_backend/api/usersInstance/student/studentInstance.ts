import {
  IContacts,
  IMessageCount,
  IMessages,
} from '@/store/types/message/messsageType';
import {
  IStudent,
  IStudentProfile,
} from '@/store/types/users/student/studentType';
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
        `/auth/student/account-confirmation/${token}`
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

  checkStudent: async (): Promise<boolean> => {
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
      console.log(`[GET: get profile] student -> res  ${response}`);
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

  studentUpcomingLessons: async () => {
    try {
      const response = await instance().get('/lesson/lessons/upcoming');
      const res = response.data;
      console.log('[GET] student list of upcoming sessions:->', res);
      return res;
    } catch (error: any) {
      console.log(`[GET: ] student -> error message => ${error.message}`);
      throw error.message;
    }
  },
  studentContactsList: async (): Promise<IContacts> => {
    try {
      const response = await instance().get(
        '/message/student/list-of-contacts'
      );
      const res = response.data;
      console.log('[GET] student list of contacts ->', res);
      return res;
    } catch (error: any) {
      console.log(`[GET: ] student -> error message => ${error.message}`);
      throw error.message;
    }
  },

  studentGetMessageCoach: async (coach_uuid: string): Promise<IMessages> => {
    try {
      const response = await instance().get(
        `/message/student/messages/${coach_uuid}`
      );
      const res = response.data;
      console.log('[GET] student messages with coach:->', coach_uuid);
      return res;
    } catch (error: any) {
      console.log(`[GET: ] student -> error message => ${error.message}`);
      throw error.message;
    }
  },

  studentSendMessageCoach: async (data: {
    receiver_id: string;
    text: string;
  }) => {
    try {
      const response = await instance().post(`/message/student/create`, data);
      const res = response.data;
      console.log('[POST] student send message to :->', data.receiver_id);
      return res;
    } catch (error: any) {
      console.log(`[POST: ] student -> error message => ${error.message}`);
      throw error.message;
    }
  },

  studentGetNotificationCount: async (): Promise<IMessageCount> => {
    try {
      const response = await instance().get(`/notification/student/new`);
      const res = response.data;
      console.log('[GET] student notifications count ->', res);
      return res;
    } catch (error: any) {
      console.log(`[GET: ] student -> error message => ${error.message}`);
      throw error.message;
    }
  },

  studentReadMessageCoach: async (coach_uuid: string) => {
    try {
      const response = await instance().post(
        `/message/student/messages/${coach_uuid}/read`
      );
      const res = response.data;
      console.log('[POST] student read messages with coach:->', coach_uuid);
      return res;
    } catch (error: any) {
      console.log(`[POST: ] student -> error message => ${error.message}`);
      throw error.message;
    }
  },
};
