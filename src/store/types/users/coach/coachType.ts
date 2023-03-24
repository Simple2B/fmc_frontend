// created coach (save to db info student)
export interface ICoach {
  email: string;
  username: string;
  password: string;
}

export interface ICoachResponse {}

// sign in
export interface IResponseCoachData {
  access_token: string;
  token_type: string;
}

export interface ICoachProfile {
  uuid: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_picture: string;
  is_verified: boolean;
  about: string | null;
}
