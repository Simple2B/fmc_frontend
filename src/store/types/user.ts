/* eslint-disable no-unused-vars */
export enum UserType {
  student = 'student',
  coach = 'coach',
}

export enum TypeSign {
  up = 'up',
  in = 'in',
}

export interface IUserProfile {
  uuid: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_picture: string;
  is_verified: boolean;
}
