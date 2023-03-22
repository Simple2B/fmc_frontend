import { ILocation } from '../location/locationType';
import { ISport } from '../sport/sportType';
import { ICoachProfile } from '../users/coach/coachType';

export interface ILesson {
  name: string;
  location: ILocation;
  sport: ISport;
  date: string;
  price: number;
  notes: string | null;
}

export interface ISession {
  lesson: ILesson;
  coach: ICoachProfile;
  appointment_time: string;
  date: string;
}

export interface ISessions {
  lessons: ISession[];
}
