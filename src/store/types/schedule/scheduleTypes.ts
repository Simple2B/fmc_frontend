import { IBasePackage } from '../coach_package/packageTypes';
import { IYourProfile } from '../users/coach/profileType';

export interface IBaseSchedule {
  lesson_id?: number;
  coach_id?: number;
  start_datetime: Date | string;
  end_datetime: Date | string;
}

export interface ISchedule extends IBaseSchedule {
  uuid: string;
  lesson: IBasePackage;
  coach_id: number;
  is_booked: boolean;
  coach: IYourProfile;
  reccurence: string | null;
}
