import { IUserProfile } from '@/store/types/user';
import { NextRouter } from 'next/router';

export const logout = (
  // eslint-disable-next-line no-unused-vars
  setIsLoad: (value: React.SetStateAction<boolean>) => void,
  // eslint-disable-next-line no-unused-vars
  setProfile: (value: React.SetStateAction<IUserProfile>) => void,
  router: NextRouter,
  // eslint-disable-next-line no-unused-vars
  setMobileOpen?: (value: React.SetStateAction<boolean>) => void,
  setUserType?: (
    // eslint-disable-next-line no-unused-vars
    value: React.SetStateAction<string | null | undefined>
  ) => void
) => {
  setIsLoad(true);
  setTimeout(() => {
    router.push('/');
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    if (setUserType) setUserType(null);
    setProfile({
      uuid: '',
      username: '',
      email: '',
      first_name: '',
      last_name: '',
      profile_picture: '',
      is_verified: false,
    });
    setIsLoad(false);
    if (setMobileOpen) setMobileOpen((prevState: boolean) => !prevState);
  }, 1000);
};
