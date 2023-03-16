import AuthenticatedLayout from '@/components/layouts/authenticated/AuthenticatedLayouts';
import FavoriteCoaches from '@/components/profiles/student/favorite_coaches/FavoriteCoaches';
import GetHelp from '@/components/profiles/student/get_help/GetHelp';
import Messages from '@/components/profiles/student/messages/Messages';
import MyLessons from '@/components/profiles/student/my_lessons/MyLessons';
import Settings from '@/components/profiles/student/settings/Settings';
import { getCurrentUser } from '@/helper/get_current_user';
import { UserType } from '@/store/types/user';
import {
  CalendarToday,
  FavoriteBorder,
  Help,
  Message as Mess,
  Settings as Sett,
} from '@mui/icons-material';
import { Box } from '@mui/material';
// import useMediaQuery from '@mui/material/useMediaQuery';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const listItemsStudent = [
  {
    name: 'My lessons',
    icon: <CalendarToday color={'primary'} />,
    href: '/profiles/student?my_lessons',
  },
  {
    name: 'Favorite coaches',
    icon: <FavoriteBorder color={'primary'} />,
    href: '/profiles/student?favorite_coaches',
  },
  {
    name: 'Messages',
    icon: <Mess color={'primary'} />,
    href: '/profiles/student?messages',
  },
  {
    name: 'Settings',
    icon: <Sett color={'primary'} />,
    href: '/profiles/student?settings',
  },
  {
    name: 'Get help',
    icon: <Help color={'primary'} />,
    href: '/profiles/student?get_help',
  },
];

export default function ProfileStudent() {
  // const matches = useMediaQuery('(min-width:900px)');
  const router = useRouter();
  const [href, setHref] = useState<string>('my_lessons');
  // eslint-disable-next-line no-undef
  const profileComponents: { [key: string]: JSX.Element } = {
    ['my_lessons']: <MyLessons />,
    ['favorite_coaches']: <FavoriteCoaches />,
    ['messages']: <Messages />,
    ['settings']: <Settings />,
    ['get_help']: <GetHelp />,
  };

  useEffect(() => {
    setHref(router.asPath.split('?')[1]);
  }, [router.asPath]);

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

  return (
    <>
      <Head>
        <title>Profile Student</title>
        <meta name="description" content="Profile Student" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthenticatedLayout
        userType={UserType.student}
        listItems={listItemsStudent}
      >
        <Box flex={1} p={2}>
          {profileComponents[href]}
        </Box>
      </AuthenticatedLayout>
    </>
  );
}
