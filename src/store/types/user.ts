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
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  profile_picture: string;
  is_verified: boolean;
}
