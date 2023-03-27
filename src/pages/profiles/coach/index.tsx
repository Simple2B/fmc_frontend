import AuthenticatedLayout from '@/components/layouts/authenticated/AuthenticatedLayouts';
import MyAppointments from '@/components/profiles/coach/my_appointments/MyAppointments';
import Packages from '@/components/profiles/coach/packages/Packages';
import Reviews from '@/components/profiles/coach/reviews/Reviews';
import Settings from '@/components/profiles/coach/settings/Settings';
import GetHelp from '@/components/profiles/get_help/GetHelp';
import Messages from '@/components/profiles/messages/Messages';
import { coachClientApi } from '@/fast_api_backend/api/usersInstance/coach/coachInstance';
import { instance } from '@/fast_api_backend/api/_axiosInstance';
import { IUserProfile, UserType } from '@/store/types/user';
import {
  CalendarToday,
  FavoriteBorder,
  Help,
  Message as Mess,
  Mode,
  Settings as Set,
} from '@mui/icons-material';
import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const LoginPage = dynamic(() => import('../../sign_in/coach'));

const listItemsCoach = [
  {
    name: 'My Appointments ',
    icon: <CalendarToday color={'primary'} />,
    href: '/profiles/coach?my_appointments ',
  },
  {
    name: 'Reviews',
    icon: <FavoriteBorder color={'primary'} />,
    href: '/profiles/coach?reviews',
  },
  {
    name: 'Packages',
    icon: <Mode color={'primary'} />,
    href: '/profiles/coach?packages',
  },
  {
    name: 'Messages',
    icon: <Mess color={'primary'} />,
    href: '/profiles/coach?message',
  },
  {
    name: 'Settings',
    icon: <Set color={'primary'} />,
    href: '/profiles/coach?settings',
  },
  {
    name: 'Get help',
    icon: <Help color={'primary'} />,
    href: '/profiles/coach?get_help',
  },
];

export default function ProfileCoach() {
  const router = useRouter();

  const [isLogIn, setIsLogIn] = useState<boolean | null>(null);

  const [isOpenMobSideBar, setIsOpenMobSideBar] = useState<boolean>(false);
  const [href, setHref] = useState<string>('my_appointments');
  const [profile, setProfile] = useState<IUserProfile>({
    uuid: '',
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    profile_picture: '',
    is_verified: false,
  });

  useEffect(() => {
    const whoAmI = async () => {
      try {
        const response = await instance().get('/whoami/coach');
        const res = response.data;
        console.log(`[GET] check coach -> res data  ${res}`);
        setIsLogIn(true);
        const coachProfile = await coachClientApi.coachGetProfile();
        setProfile(coachProfile);
      } catch (error: any) {
        console.log(
          `[GET] check coach -> error message => ${error.response.status}`
        );
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        setIsLogIn(false);
        router.push('/sign_in/coach');
      }
    };
    whoAmI();
  }, [router, router.asPath]);

  // eslint-disable-next-line no-undef
  const profileComponents: { [key: string]: JSX.Element } = {
    ['my_appointments']: <MyAppointments profile={profile} />,
    ['reviews']: <Reviews />,
    ['packages']: <Packages />,
    ['message']: <Messages userType={UserType.coach} />,
    ['settings']: <Settings userType={UserType.coach} />,
    ['get_help']: <GetHelp userType={UserType.coach} email={profile.email} />,
  };

  useEffect(() => {
    setHref(router.asPath.split('?')[1]);
  }, [router.asPath]);

  const closeOpenMobSideBar = () => {
    setIsOpenMobSideBar(!isOpenMobSideBar);
  };

  return (
    <>
      <Head>
        <title>Profile Coach</title>
        <meta name="description" content="Profile Coach" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLogIn ? (
        <AuthenticatedLayout
          userType={UserType.coach}
          listItems={listItemsCoach}
          isOpenMobSideBar={isOpenMobSideBar}
          closeOpenMobSideBar={closeOpenMobSideBar}
        >
          <Box flex={1} p={2}>
            {profileComponents[href]}
          </Box>
        </AuthenticatedLayout>
      ) : (
        <LoginPage />
      )}
    </>
  );
}
