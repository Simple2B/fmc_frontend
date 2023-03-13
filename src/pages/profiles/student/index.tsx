import AuthenticatedLayout from '@/components/layouts/authenticated/AuthenticatedLayouts';
import { UserType } from '@/store/types/user';
import {
  CalendarToday,
  FavoriteBorder,
  Help,
  Message,
  Settings,
} from '@mui/icons-material';
import { Box } from '@mui/material';
// import useMediaQuery from '@mui/material/useMediaQuery';
import Head from 'next/head';
import { useRouter } from 'next/router';

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
    icon: <Message color={'primary'} />,
    href: '/profiles/student?messages',
  },
  {
    name: 'Settings',
    icon: <Settings color={'primary'} />,
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
          {router.asPath.split('?')[1]}
        </Box>
      </AuthenticatedLayout>
    </>
  );
}
