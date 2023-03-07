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
