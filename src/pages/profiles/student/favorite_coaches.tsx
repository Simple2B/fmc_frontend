import { UserType } from '@/store/types/user';
// import useMediaQuery from '@mui/material/useMediaQuery';
import Head from 'next/head';
import AuthenticatedLayout from '../../../components/layouts/authenticated/AuthenticatedLayouts';

export default function FavoriteCoaches() {
  // const matches = useMediaQuery('(min-width:900px)');
  return (
    <>
      <Head>
        <title>Favorite Coaches</title>
        <meta name="description" content="Favorite Coaches" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthenticatedLayout userType={UserType.student}>
        Favorite Coaches
      </AuthenticatedLayout>
    </>
  );
}
