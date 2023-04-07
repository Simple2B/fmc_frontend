import { IPackage } from '@/store/types/coach_package/packageTypes';
import { instance } from '../../_axiosInstance';

export const coachPackageApi = {
  createPackage: async (data: IPackage): Promise<string> => {
    try {
      const response = await instance().post('/package/create', data);
      const res = response.data;
      console.log(`[POST] create coach' package  -> res data  ${res}`);
      return res;
    } catch (error: any) {
      console.log(
        `[POST] create coach' package  -> error message => ${error.message}`
      );
      throw error.message;
    }
  },
};
