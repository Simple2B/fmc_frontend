import AuthenticatedLayout from '@/components/layouts/authenticated/AuthenticatedLayouts';
import { UserType } from '@/store/types/user';
import { Box } from '@mui/material';
// import useMediaQuery from '@mui/material/useMediaQuery';
import Head from 'next/head';

export default function MyLessons() {
  // const matches = useMediaQuery('(min-width:900px)');
  return (
    <>
      <Head>
        <title>Lessons Student</title>
        <meta name="description" content="Lessons Student" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthenticatedLayout userType={UserType.student}>
        <Box flex={1} p={2}>
          My Lessons
        </Box>
      </AuthenticatedLayout>
    </>
  );
}
