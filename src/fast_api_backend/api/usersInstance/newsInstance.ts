import { applicationInstance } from '../_axiosInstance';

export const newsApi = {
  subscribeNews: async (data: { email: string }): Promise<number | string> => {
    try {
      const response = await applicationInstance().post(
        '/newsletter/subscribe',
        data
      );
      console.log(`[POST: newsletter]  -> res data  ${response}`);

      return response.data;
    } catch (error: any) {
      console.log(`[POST] newsletter -> error message => ${error.message}`);
      throw error;
    }
  },
};
