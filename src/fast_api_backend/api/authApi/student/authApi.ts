import { IUserGoogleRequest } from '@/store/types/users/googleUserType';
import { IResponseStudentData } from '../../../../store/types/users/student/studentType';
import { authApplicationInstance, authInstance } from '../../_axiosInstance';

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

export const studentAuthApi = {
  signInStudent: async (
    email: string,
    password: string
  ): Promise<IResponseStudentData | string> => {
    try {
      const response = await authInstance.post(
        '/auth/student/login',
        formatRequestBody(email, password)
      );
      console.log('POST [/sign_in] student successfully');
      return response.data;
    } catch (error: any) {
      console.log(`POST [/sign_in] student - error: ${error}`);
      throw error.message;
    }
  },
  googleAuthStudent: async (
    data: IUserGoogleRequest
  ): Promise<{ access_token: string; token_type: string }> => {
    try {
      const response = await authApplicationInstance.post(
        '/auth/student/google-oauth',
        data
      );
      console.log('POST [/google-oauth] student successfully', response);
      return response.data;
    } catch (error: any) {
      console.log(`POST [/google-oauth] student - error: ${error}`);
      throw error.message;
    }
  },
};
