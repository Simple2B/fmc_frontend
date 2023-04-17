import AuthenticatedLayout from '@/components/layouts/authenticated/AuthenticatedLayouts';

import MyAppointments from '@/components/profiles/coach/my_appointments/MyAppointments';
import Packages from '@/components/profiles/coach/packages/Packages';
import Reviews from '@/components/profiles/coach/reviews/Reviews';
import Settings from '@/components/profiles/coach/settings/Settings';
import GetHelp from '@/components/profiles/get_help/GetHelp';
import Messages from '@/components/profiles/messages/Messages';

import SubscriptionCheck from '@/components/subscription_check_state/SubscriptionCheckState';

import LessonRequestsCalendar from '@/components/profiles/coach/my_appointments/lesson_requests_calendar/LessonRequestsCalendar';
import { instance } from '@/fast_api_backend/api/_axiosInstance';
import { coachClientApi } from '@/fast_api_backend/api/usersInstance/coach/coachInstance';
import { User } from '@/services';
import { UserType } from '@/store/types/user';
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

export default function ProfileCoach() {
  const router = useRouter();

  const coachQuery = { data: { is_active: true } };

  // const coachQuery = useQuery<ICoachSubscription | null, ErrorConstructor>(
  //   ['coachSubscription'],
  //   async () => {
  //     const request = coachSubscriptionApi.getSubscription;
  //     const result = await request();
  //     console.log('[coach subscription] coach result', result);
  //     return result;
  //   },
  //   {}
  // );
  const [isLogIn, setIsLogIn] = useState<boolean | null>(null);
  const [isOpenMobSideBar, setIsOpenMobSideBar] = useState<boolean>(false);
  const [href, setHref] = useState<string>('my_appointments');

  const [profile, setProfile] = useState<User>({
    uuid: '',
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    profile_picture: '',
    is_verified: false,
    stripe_account_id: null,
  });

  const uuidUser = router.asPath.split('message&')[1];

  useEffect(() => {
    const whoAmI = async () => {
      try {
        const response = await instance().get('/whoami/coach');
        // const response = await WhoamiService.apiWhoamiCoach();
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

  const [listItemsCoach, setItemsCoach] = useState<
    {
      name: string;
      icon: any;
      href: string;
    }[]
  >([
    {
      name: 'My Appointments ',
      icon: <CalendarToday sx={{ color: '#222CDF' }} />,
      href: '/profiles/coach?my_appointments',
    },
    {
      name: 'Reviews',
      icon: <FavoriteBorder sx={{ color: '#222CDF' }} />,
      href: '/profiles/coach?reviews',
    },
    {
      name: 'Packages',
      icon: <Mode sx={{ color: '#222CDF' }} />,
      href: '/profiles/coach?packages',
    },
    {
      name: 'Messages',
      icon: <Mess sx={{ color: '#222CDF' }} />,
      href: `/profiles/coach?message&${uuidUser}`,
    },
    {
      name: 'Settings',
      icon: <Set sx={{ color: '#222CDF' }} />,
      href: '/profiles/coach?settings',
    },
    {
      name: 'Get help',
      icon: <Help sx={{ color: '#222CDF' }} />,
      href: '/profiles/coach?get_help',
    },
  ]);

  const onContactSelected = (contactUUID: string) => {
    setItemsCoach(
      listItemsCoach.map((item) => {
        if (item.name === 'Messages') {
          return {
            ...item,
            href: `/profiles/coach?message&${contactUUID}`,
          };
        }
        return item;
      })
    );
    router.push(`/profiles/coach?message&${contactUUID}`);
  };

  useEffect(() => {
    setHref(router.asPath.split('?')[1]);
  }, [router.asPath]);

  const closeOpenMobSideBar = () => {
    setIsOpenMobSideBar(!isOpenMobSideBar);
  };

  // eslint-disable-next-line no-undef
  const profileComponents: { [key: string]: JSX.Element | null } = {
    ['my_appointments']: coachQuery.data?.is_active ? (
      <LessonRequestsCalendar />
    ) : (
      <MyAppointments profile={profile} />
    ),
    ['my_appointments#lesson_requests']: coachQuery.data?.is_active ? (
      <LessonRequestsCalendar />
    ) : null,
    ['reviews']: <Reviews title={'Your Reviews'} />,
    ['packages']: <Packages />,
    [`message&${uuidUser}`]: (
      <Messages
        userType={UserType.coach}
        onContactSelected={onContactSelected}
      />
    ),
    ['settings']: <Settings userType={UserType.coach} />,
    ['get_help']: <GetHelp userType={UserType.coach} email={profile.email} />,
  };

  return (
    <>
      {/* TODO: add component Head */}
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
          <SubscriptionCheck />
        </AuthenticatedLayout>
      ) : (
        <LoginPage />
      )}
    </>
  );
}
