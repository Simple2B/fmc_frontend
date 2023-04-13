/* eslint-disable no-unused-vars */
export enum UserType {
  student = 'student',
  coach = 'coach',
}

export enum TypeSign {
  up = 'up',
  in = 'in',
}

export enum TypeTheme {
  dark = 'dark',
  light = 'light',
}

export interface IUserProfile {
  stripe_account_id: string | null;
  uuid: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  profile_picture: string;
  is_verified: boolean;
}
