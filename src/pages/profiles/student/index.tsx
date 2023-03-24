import AuthenticatedLayout from '@/components/layouts/authenticated/AuthenticatedLayouts';
import GetHelp from '@/components/profiles/get_help/GetHelp';
import Messages from '@/components/profiles/messages/Messages';
import FavoriteCoaches from '@/components/profiles/student/favorite_coaches/FavoriteCoaches';
import MyLessons from '@/components/profiles/student/my_lessons/MyLessons';
import Settings from '@/components/profiles/student/settings/Settings';
import { getCurrentUser } from '@/helper/get_current_user';
import { UserType } from '@/store/types/user';
import { IStudentProfile } from '@/store/types/users/student/studentType';
import {
  CalendarToday,
  FavoriteBorder,
  Help,
  Message as Mess,
  Settings as Sett,
} from '@mui/icons-material';
import { Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
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
  const matches414 = useMediaQuery('(max-width:414px)');
  const router = useRouter();
  const [profile, setProfile] = useState<IStudentProfile>({
    uuid: '',
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    profile_picture: '',
    is_verified: false,
  });
  const [href, setHref] = useState<string>('my_lessons');
  // eslint-disable-next-line no-undef
  const profileComponents: { [key: string]: JSX.Element } = {
    ['my_lessons']: <MyLessons name={profile.username} />,
    ['favorite_coaches']: <FavoriteCoaches />,
    ['messages']: <Messages userType={UserType.student} />,
    ['settings']: <Settings userType={UserType.student} />,
    ['get_help']: <GetHelp userType={UserType.student} email={profile.email} />,
  };

  useEffect(() => {
    setHref(router.asPath.split('?')[1]);
  }, [router.asPath]);

  useEffect(() => {
    const redirectUrl = process.env.BASE_URL;
    getCurrentUser(
      UserType.student,
      setProfile,
      undefined,
      undefined,
      undefined,
      redirectUrl
    );
  }, []);

  return (
    <>
      <Head>
        <title>Profile Athlete</title>
        <meta name="description" content="Profile Athlete" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthenticatedLayout
        userType={UserType.student}
        listItems={listItemsStudent}
      >
        <Box flex={matches414 ? 0 : 1} p={matches414 ? 0 : 2}>
          {profileComponents[href]}
        </Box>
      </AuthenticatedLayout>
    </>
  );
}
