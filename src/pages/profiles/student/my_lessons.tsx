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
      {/* <AuthenticatedLayout userType={UserType.student}>
        <Box>My Lessons</Box>
      </AuthenticatedLayout> */}
      <Box>My Lessons</Box>
    </>
  );
}
