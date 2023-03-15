import { IUserGoogleRequest } from '@/store/types/users/googleUserType';
import { IResponseCoachData } from '../../../../store/types/users/coach/coachType';
import { applicationInstance, authInstance } from '../../_axiosInstance';

const formatRequestBody = (email: string, password: string) => {
  const formData = new FormData();
  formData.append('grant_type', '');
  formData.append('username', email);
  formData.append('password', password);
  formData.append('scope', '');
  formData.append('client_id', '');
  formData.append('client_secret', '');
  return formData;
};

export const coachAuthApi = {
  signInCoach: async (
    email: string,
    password: string
  ): Promise<IResponseCoachData | string> => {
    try {
      const response = await authInstance.post(
        '/auth/coach/login',
        formatRequestBody(email, password)
      );
      console.log('POST [/sign_in] coach successfully');
      return response.data;
    } catch (error: any) {
      console.log(`POST [/sign_in] coach - error message: ${error.message}`);
      throw error.message;
    }
  },

  googleAuthCoach: async (
    data: IUserGoogleRequest
  ): Promise<{ access_token: string; token_type: string }> => {
    try {
      const response = await applicationInstance.post(
        '/auth/coach/google-oauth',
        data
      );
      console.log('POST [/google-oauth] coach successfully', response);
      return response.data;
    } catch (error: any) {
      console.log(`POST [/google-oauth] coach - error: ${error}`);
      throw error.message;
    }
  },
};
