import { applicationInstance } from '../_axiosInstance';

export const userApi = {
  question: async (data: {
    email_from: string;
    message: string;
  }): Promise<string> => {
    try {
      const response = await applicationInstance().post(
        '/contact/question',
        data
      );
      const res = response.data;
      console.log(`[POST: /contact/question] -> res data  ${res}`);
      return res;
    } catch (error: any) {
      console.log(
        `[POST: /contact/question] -> error message => ${error.message}`
      );
      throw error.message;
    }
  },
};
