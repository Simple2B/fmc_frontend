import { UserType } from '@/store/types/user';
// import useMediaQuery from '@mui/material/useMediaQuery';
import Head from 'next/head';
import AuthenticatedLayout from '../../../components/layouts/authenticated/AuthenticatedLayouts';

export default function Messages() {
  // const matches = useMediaQuery('(min-width:900px)');
  return (
    <>
      <Head>
        <title>Messages</title>
        <meta name="description" content="Messages" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthenticatedLayout userType={UserType.student}>
        Messages
      </AuthenticatedLayout>
    </>
  );
}
