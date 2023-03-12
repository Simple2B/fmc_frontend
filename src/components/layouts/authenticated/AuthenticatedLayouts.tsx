/* eslint-disable no-unused-vars */
import NavBar from '@/common/nav_bar/NavBar';
import RightBar from '@/common/right_bar/RightBar';
import SideBar from '@/common/side_bar/SideBar';
import { IStudentProfile } from '@/store/types/users/student/studentType';
import { Box, createTheme, PaletteMode, Stack } from '@mui/material';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';
import * as React from 'react';
import { coachClientApi } from '../../../fast_api_backend/api/usersInstance/coach/coachInstance';
import { studentClientApi } from '../../../fast_api_backend/api/usersInstance/student/studentInstance';
import { UserType } from '../../../store/types/user';

export interface IStudentAuthenticatedLayout {
  children: any;
  userType: string;
}

const AuthenticatedLayout: React.FC<IStudentAuthenticatedLayout> = ({
  children,
  userType,
}) => {
  const router = useRouter();
  const [profile, setProfile] = React.useState<IStudentProfile>({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    profile_picture: '',
    is_verified: false,
  });

  const [mode, setMode] = React.useState<PaletteMode>('light');

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  console.log('====================================');
  console.log('AuthenticatedLayout: profile ', profile);
  console.log('====================================');

  React.useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType]);

  async function getProfile() {
    if (userType === UserType.student) {
      const res = await studentClientApi.checkStudent();
      if (res) {
        const studentProfile = await studentClientApi.studentGetProfile();
        setProfile(studentProfile);
      } else {
        redirect('/sign_in/student');
      }
    }

    if (userType === UserType.coach) {
      const res = await coachClientApi.checkCoach();
      console.log('coach: res ', res);
      if (res) {
        const coachProfile = await coachClientApi.coachGetProfile();
        setProfile(coachProfile);
      } else {
        redirect('/sign_in/coach');
      }
    }
  }

  // TODO: remove and add for next page with this layout
  // function logout() {
  //   localStorage.removeItem('token');
  //   router.push('/');
  // }

  return (
    <Box>
      <NavBar
        username={profile.username}
        picture={profile.profile_picture}
        userType={userType}
      />
      <Stack direction="row" spacing="2" justifyContent="space-between">
        <SideBar />
        {children}
        <RightBar />
      </Stack>
    </Box>
  );
};

export default AuthenticatedLayout;
