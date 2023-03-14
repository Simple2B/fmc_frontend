import { ISignIn } from './SignIn';

const base: ISignIn = {
  title: 'Welcome',
  userType: 'coach',
  // eslint-disable-next-line no-unused-vars
  onSuccess: function (res: any): void {
    throw new Error('Function not implemented.');
  },
  // eslint-disable-next-line no-unused-vars
  onFailure: function (res: any): void {
    throw new Error('Function not implemented.');
  },
};

export const mockSignInProps = {
  base,
};

export {};
