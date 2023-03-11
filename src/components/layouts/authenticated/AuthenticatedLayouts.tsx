import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';
import * as React from 'react';
import TopBar from '../../../common/top_bar/TopBar';
import { coachClientApi } from '../../../fast_api_backend/api/usersInstance/coach/coachInstance';
import { studentClientApi } from '../../../fast_api_backend/api/usersInstance/student/studentInstance';
import { UserType } from '../../../store/types/user';
import style from './AuthenticatedLayouts.module.sass';

export interface IStudentAuthenticatedLayout {
  children: any;
  userType: string;
}

const AuthenticatedLayout: React.FC<IStudentAuthenticatedLayout> = ({
  children,
  userType,
}) => {
  const router = useRouter();
  const [profile, setProfile] = React.useState();

  const theme = createTheme({});

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
      console.log('====================================');
      console.log('student: res ', res);
      console.log('====================================');
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
  // eslint-disable-next-line no-unused-vars
  function logout() {
    localStorage.removeItem('token');
    router.push('/');
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={style.containerProfile}>
        {/* <SideBar /> */}
        <main className={style.content}>
          <TopBar />
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
};

export default AuthenticatedLayout;
