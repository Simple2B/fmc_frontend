import { TypeSign, UserType } from '@/store/types/user';
import useMediaQuery from '@mui/material/useMediaQuery';
import Head from 'next/head';
import linkLogo from '../../../public/white_fmc_logo.png';
import SignIn from '../../components/forms/sign_in/SignIn';
import SignUpSPLayout from '../../components/layouts/sign_up_sp_layout/SignUpSPLayout';

export default function SignInStudent() {
  const matches = useMediaQuery('(min-width:900px)');
  return (
    <>
      <Head>
        <title>Sign In Student</title>
        <meta name="description" content="Sign In Student" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignUpSPLayout
        linkBackgroundImg={
          matches ? '../../../img/pexels-tima-miroshnichenko.png' : ' '
        }
        wrapperClassName={'boxWithBackgroundStudentPage'}
        linkLogo={linkLogo}
        color={'#000'}
        description={'Don’t have an account?'}
        userType={UserType.student}
        typeSign={TypeSign.in}
      >
        <SignIn title={'Welcome back'} userType={UserType.student} />
      </SignUpSPLayout>
    </>
  );
}
