import { TypeSign, UserType } from '@/store/types/user';
import useMediaQuery from '@mui/material/useMediaQuery';
import Head from 'next/head';
import linkLogo from '../../../public/LOGO.svg';
import InfoForgotPassword from '../../components/forms/forgot_password/info/InfoForgotPassword';
import SignUpSPLayout from '../../components/layouts/sign_up_sp/SignUpSPLayout';

export default function InfoStudent() {
  const matches = useMediaQuery('(min-width:900px)');
  return (
    <>
      <Head>
        <title>Student</title>
        <meta name="description" content="Student" />
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
        userType={UserType.coach}
        typeSign={TypeSign.in}
        isGoBack={true}
      >
        <InfoForgotPassword userType={UserType.student} />
      </SignUpSPLayout>
    </>
  );
}
