import { IContact, IMessages } from '@/store/types/message/messageType';
import { IUserProfile } from '@/store/types/user';
import { IStudent } from '@/store/types/users/student/studentType';

import { WhoamiService } from '@/services';
import {
  ISession,
  ISessions,
  IUnreviewedLessonsList,
} from '@/store/types/session/sessionTypes';
import { IYourProfile } from '@/store/types/users/coach/profileType';
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
      // const response = await instance().get('/whoami/student');
      const response = await WhoamiService.apiWhoamiStudent();
      const res = response.data;
      console.log(`[GET] check student -> res data  ${res}`);
      return res;
    } catch (error: any) {
      console.log(`[GET] check student -> error message => ${error}`);
      throw error;
    }
  },

  studentGetProfile: async (): Promise<IUserProfile> => {
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

  studentUpcomingLessons: async (): Promise<ISessions> => {
    try {
      const response = await instance().get('/lesson/lessons/student/upcoming');
      const res = response.data;
      console.log('[GET] student list of upcoming sessions:->', res);
      return res;
    } catch (error: any) {
      console.log(`[GET: ] student -> error message => ${error.message}`);
      throw error.message;
    }
  },

  studentContactsList: async (): Promise<IContact[]> => {
    try {
      const response = await instance().get(
        '/message/student/list-of-contacts'
      );
      const res = response.data;
      console.log('[GET] student list of contacts ->', res);
      return res.contacts;
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

  studentGetReviewNotifications: async (): Promise<IUnreviewedLessonsList> => {
    try {
      const response = await instance().get(`/notification/student/reviews`);
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

  studentGetLessonData: async (session_uuid: string): Promise<ISession> => {
    try {
      const response = await instance().get(`/lesson/${session_uuid}`);
      const res = response.data;
      console.log('[GET] student lesson ->', res);
      return res;
    } catch (error: any) {
      console.log(`[GET: ] student -> error message => ${error.message}`);
      throw error.message;
    }
  },

  studentSendSessionReview: async (
    data: {
      text: string;
      rate: number;
    },
    lesson_uuid: string
  ): Promise<number> => {
    try {
      const response = await instance().post(`/review/${lesson_uuid}`, data);
      const res = response.data;
      console.log('[POST] student leaving review for lesson :->', lesson_uuid);
      return res;
    } catch (error: any) {
      console.log(`[POST: ] student -> error message => ${error.message}`);
      throw error.message;
    }
  },

  getCoachesCardsWithLikes: async (): Promise<IYourProfile[]> => {
    try {
      const response = await instance().get('/like/student/favourites');
      const res = response.data;
      console.log(
        `[GET]  coaches profiles cards (with likes) -> res data  ${res}`
      );
      return res.coaches;
    } catch (error: any) {
      console.log(
        `[GET] coaches profiles cards (with likes) -> error message ${error.message}`
      );
      throw error.message;
    }
  },
  studentLikeCoach: async (coach_uuid: string) => {
    try {
      const response = await instance().post(`/like/coach/${coach_uuid}`);
      const res = response.data;
      console.log('[POST] student like coach', res);
      return res;
    } catch (error: any) {
      console.log(
        `[POST: ]  student like coach, error message => ${error.message}`
      );
      throw error.message;
    }
  },

  studentUnLikeCoach: async (coach_uuid: string) => {
    try {
      const response = await instance().post(
        `/like/coach/unlike/${coach_uuid}`
      );
      const res = response.data;
      console.log('[POST] student unlike coach', res);
      return res;
    } catch (error: any) {
      console.log(
        `[POST: ]  student unlike coach, error message => ${error.message}`
      );
      throw error.message;
    }
  },
};
