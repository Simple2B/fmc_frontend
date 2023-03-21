import AuthenticatedLayout from '@/components/layouts/authenticated/AuthenticatedLayouts';
import GetHelp from '@/components/profiles/coach/get_help/GetHelp';
import Messages from '@/components/profiles/coach/messages/Messages';
import MyAppointments from '@/components/profiles/coach/my_appointments/MyAppointments';
import Packages from '@/components/profiles/coach/packages/Packages';
import Reviews from '@/components/profiles/coach/reviews/Reviews';
import Settings from '@/components/profiles/coach/settings/Settings';
import { getCurrentUser } from '@/helper/get_current_user';
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
// import useMediaQuery from '@mui/material/useMediaQuery';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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

  const [href, setHref] = useState<string>('my_appointments');

  // eslint-disable-next-line no-undef
  const profileComponents: { [key: string]: JSX.Element } = {
    ['my_appointments']: <MyAppointments />,
    ['reviews']: <Reviews />,
    ['packages']: <Packages />,
    ['message']: <Messages />,
    ['settings']: <Settings userType={UserType.coach} />,
    ['get_help']: <GetHelp />,
  };

  useEffect(() => {
    const redirectUrl = process.env.BASE_URL;
    getCurrentUser(
      UserType.student,
      undefined,
      undefined,
      undefined,
      undefined,
      redirectUrl
    );
  }, []);

  useEffect(() => {
    setHref(router.asPath.split('?')[1]);
  }, [router.asPath]);

  return (
    <>
      <Head>
        <title>Profile Coach</title>
        <meta name="description" content="Profile Coach" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthenticatedLayout userType={UserType.coach} listItems={listItemsCoach}>
        <Box flex={1} p={2}>
          {profileComponents[href]}
        </Box>
      </AuthenticatedLayout>
    </>
  );
}
