import { authInstance } from '../_axiosInstance';

export const authApi = {
  getGoogleKey: async (): Promise<{
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
  }> => {
    try {
      const response = await authInstance.get('/keys/google');
      console.log('GET [/keys/google]  successfully');
      return response.data;
    } catch (error: any) {
      console.log(`GET [/keys/google]  - error: ${error}`);
      throw error.message;
    }
  },
};
