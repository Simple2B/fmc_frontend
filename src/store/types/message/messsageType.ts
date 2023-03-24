import { ICoachProfile } from '../users/coach/coachType';
import { IStudentProfile } from '../users/student/studentType';

interface IMessageBase {
  uuid: string;
  text: string;
  created_at: string;
  is_read: boolean;
}
export interface IMessage extends IMessageBase {
  author: IStudentProfile | ICoachProfile;
  receiver: IStudentProfile | ICoachProfile;
}

export interface IMessages {
  messages: IMessage[];
}

export interface IContact {
  user: IStudentProfile | ICoachProfile;
  message: IMessageBase;
}
export interface IContacts {
  contacts: IContact[];
}

export interface IMessageCount {
  count: number;
}
