import { ISignUpSPLayout } from './SignUpSPLayout';
import linkImgBG from '/public/img/young-basketball-bg.png';
import linkLogo from '/public/LOGO.svg';

// for children put some component
const base: ISignUpSPLayout = {
  linkBackgroundImg: linkImgBG,
  linkLogo: linkLogo,
  color: '#fff',
  wrapperClassName: 'boxWithBackgroundStartPage',
  description: 'Already have an account? Log in like a',
  userType: 'student',
  typeSign: 'signUp',
};

export const mockSignUpSPLayoutProps = {
  base,
};
