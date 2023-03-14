import AuthenticatedLayout from '@/components/layouts/authenticated/AuthenticatedLayouts';
import { UserType } from '@/store/types/user';
import {
  CalendarToday,
  FavoriteBorder,
  Help,
  Message,
  Mode,
  Settings,
} from '@mui/icons-material';
import { Box } from '@mui/material';
// import useMediaQuery from '@mui/material/useMediaQuery';
import Head from 'next/head';
import { useRouter } from 'next/router';

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
    icon: <Message color={'primary'} />,
    href: '/profiles/coach?message',
  },
  {
    name: 'Settings',
    icon: <Settings color={'primary'} />,
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
          {router.asPath.split('?')[1]}
        </Box>
      </AuthenticatedLayout>
    </>
  );
}
