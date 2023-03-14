import { ISignUp } from './SignUp';

// eslint-disable-next-line no-unused-vars
const base: ISignUp = {
  title: '',
  userType: '',
  // eslint-disable-next-line no-unused-vars
  onSuccess: function (res: any): void {
    throw new Error('Function not implemented.');
  },
  // eslint-disable-next-line no-unused-vars
  onError: function (res: any): void {
    throw new Error('Function not implemented.');
  },
};

export const mockBaseSignUpPageProps = {};
