import { ICoachSubscription } from '@/store/types/users/coach/profileType';
import { instance } from '../../_axiosInstance';

export const coachSubscriptionApi = {
  getCheckoutSession: async (): Promise<{ url: string }> => {
    try {
      const response = await instance().post('/subscription/coach/create');
      const res = response.data;
      console.log(`[POST: /subscription/coach/create] -> res data  ${res}`);
      return res;
    } catch (error: any) {
      console.log(
        `[POST: /subscription/coach/create] -> error message => ${error.message}`
      );
      throw error;
    }
  },
  getSubscription: async (): Promise<ICoachSubscription | null | number> => {
    try {
      const response = await instance().get('/profile/coach/subscription/info');
      const res = response.data;
      console.log(`[GET: /coach/subscription/info] -> res data  ${res}`);
      return res;
    } catch (error: any) {
      console.log(
        `[GET: /coach/subscription/info] -> error message => ${error.message}`
      );
      throw error;
    }
  },
};
