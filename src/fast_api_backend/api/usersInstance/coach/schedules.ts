import { ISchedule } from '@/store/types/schedule/scheduleTypes';
import { instance } from '../../_axiosInstance';

export const coachSchedulesApi = {
  getSchedules: async (): Promise<
    { uuid: string; location: Location }[] | string
  > => {
    try {
      const response = await instance().get('/schedule/schedules');
      const res = response.data;
      console.log(`[GET] schedules coach -> res data  ${res}`);
      return res.schedules;
    } catch (error: any) {
      console.log(`[GET] schedules coach -> error message => ${error.message}`);
      throw error.message;
    }
  },

  createSchedule: async (data: ISchedule): Promise<string> => {
    try {
      const response = await instance().post('/schedule/create', data);
      const res = response.data;
      console.log(`[POST] create coach' schedule  -> res data  ${res}`);
      return res;
    } catch (error: any) {
      console.log(
        `[POST] create coach' schedule  -> error message => ${error.message}`
      );
      throw error.message;
    }
  },
};
