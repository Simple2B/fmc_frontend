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
  getSubscription: async (): Promise<ICoachSubscription> => {
    try {
      const response = await instance().get('/profile/coach/subscription');
      const res = response.data;
      console.log(`[GET: /coach/subscription] -> res data  ${res}`);
      return res;
    } catch (error: any) {
      console.log(
        `[GET: /coach/subscription] -> error message => ${error.message}`
      );
      throw error;
    }
  },
};
