import { ISignUpSPLayout } from './SignUpSPLayout';
import linkLogo from '/public/fmc_logo.png';
import linkImgBG from '/public/img/young-basketball-bg.png';

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
