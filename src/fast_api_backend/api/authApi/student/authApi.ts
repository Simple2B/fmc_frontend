import { IResponseStudentData } from '../../../../store/types/users/student/studentType';
import { authInstance } from '../../_axiosInstance';

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

export const authApi = {
  signInStudent: async (
    email: string,
    password: string
  ): Promise<IResponseStudentData> => {
    try {
      const response = await authInstance.post(
        '/auth/student/login',
        formatRequestBody(email, password)
      );
      console.log('POST [/sign_in] student successfully');
      return response.data;
    } catch (error: any) {
      console.log(`POST [/sign_in] student - error message: ${error.message}`);
      throw error;
    }
  },
};
