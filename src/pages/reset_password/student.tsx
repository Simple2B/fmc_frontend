import { TypeSign, UserType } from '@/store/types/user';
import useMediaQuery from '@mui/material/useMediaQuery';
import Head from 'next/head';
import linkLogo from '../../../public/fmc_logo.png';
import ResetPassword from '../../components/forms/forgot_password/reset_password/ResetPassword';
import SignUpSPLayout from '../../components/layouts/sign_up_sp/SignUpSPLayout';

export default function RestPasswordStudent() {
  const matches = useMediaQuery('(min-width:900px)');
  return (
    <>
      <Head>
        <title>Rest Password Student</title>
        <meta name="description" content="Rest Password Student" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignUpSPLayout
        linkBackgroundImg={
          matches ? '../../../img/pexels-shvets-production.png' : ' '
        }
        wrapperClassName={'boxWithBackgroundStudentPage'}
        linkLogo={linkLogo}
        color={'#000'}
        description={'Don’t have an account?'}
        userType={UserType.student}
        typeSign={TypeSign.in}
      >
        <ResetPassword userType={UserType.student} />
      </SignUpSPLayout>
    </>
  );
}
