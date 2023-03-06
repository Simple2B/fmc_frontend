import { CssBaseline, ThemeProvider } from '@mui/material';
import { redirect } from 'next/navigation';
import * as React from 'react';
import SideBar from '../../../common/side_bar/SideBar';
import TopBar from '../../../common/top_bar/TopBar';
import { coachClientApi } from '../../../fast_api_backend/api/usersInstance/coach/coachInstance';
import { studentClientApi } from '../../../fast_api_backend/api/usersInstance/student/studentInstance';
import { UserType } from '../../../store/types/user';
import './StudentAuthenticatedLayouts.module.sass';

export interface IStudentAuthenticatedLayout {
  children: any;
  userType: string;
}

const AuthenticatedLayout: React.FC<IStudentAuthenticatedLayout> = ({
  children,
  userType,
}) => {
  const [profile, setProfile] = React.useState();

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
      if (res) {
        const coachProfile = await coachClientApi.coachGetProfile();
        setProfile(coachProfile);
      } else {
        redirect('/sign_in/coach');
      }
    }
  }

  return (
    <ThemeProvider theme={'white'}>
      <CssBaseline />
      <div className="containerProfile">
        <SideBar />
        <main className="content">
          <TopBar />
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
};

export default AuthenticatedLayout;
