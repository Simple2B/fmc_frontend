// created student (save to db info student)
export interface IStudent {
  email: string;
  username: string;
  password: string;
}

export interface IStudentResponse {}

// sign in
export interface IResponseStudentData {
  access_token: string;
  token_type: string;
}
