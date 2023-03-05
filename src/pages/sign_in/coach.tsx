import { TypeSign, UserType } from '@/store/types/user';
import useMediaQuery from '@mui/material/useMediaQuery';
import Head from 'next/head';
import linkLogo from '../../../public/white_fmc_logo.png';
import SignIn from '../../components/forms/sign_in/SignIn';
import SignUpSPLayout from '../../components/layouts/sign_up_sp_layout/SignUpSPLayout';

export default function SignInCoach() {
  const matches = useMediaQuery('(min-width:900px)');
  return (
    <>
      <Head>
        <title>Sign In Coach</title>
        <meta name="description" content="Sign In Coach" />
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
        userType={UserType.coach}
        typeSign={TypeSign.in}
      >
        <SignIn title={'Welcome back'} userType={UserType.coach} />
      </SignUpSPLayout>
    </>
  );
}
