import { IUserProfile } from '../user';

interface IMessageBase {
  uuid: string;
  text: string;
  created_at: string;
  is_read: boolean;
}
export interface IMessage extends IMessageBase {
  author: IUserProfile;
  receiver: IUserProfile;
}

export interface IMessages {
  messages: IMessage[];
}

export interface IContact {
  user: IUserProfile;
  message: IMessageBase;
}
export interface IContacts {
  contacts: IContact[];
}
