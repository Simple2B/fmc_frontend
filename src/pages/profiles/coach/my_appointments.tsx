import AuthenticatedLayout from '@/components/layouts/authenticated/AuthenticatedLayouts';
import { UserType } from '@/store/types/user';
import { Box } from '@mui/material';
// import useMediaQuery from '@mui/material/useMediaQuery';
import Head from 'next/head';

export default function MyAppointments() {
  // const matches = useMediaQuery('(min-width:900px)');
  return (
    <>
      <Head>
        <title>My Appointments</title>
        <meta name="description" content="My Appointments" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthenticatedLayout userType={UserType.coach}>
        <Box flex={1} p={2}>
          My Appointments
        </Box>
      </AuthenticatedLayout>
    </>
  );
}
