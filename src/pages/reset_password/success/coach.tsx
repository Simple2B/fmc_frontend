import { TypeSign, UserType } from '@/store/types/user';
import useMediaQuery from '@mui/material/useMediaQuery';
import Head from 'next/head';
import linkLogo from '../../../../public/LOGO.svg';
import SuccessInfo from '../../../components/forms/forgot_password/reset_password/success_info/SuccessInfo';
import SignUpSPLayout from '../../../components/layouts/sign_up_sp/SignUpSPLayout';

export default function ResetPasswordSuccessCoach() {
  const matches = useMediaQuery('(min-width:900px)');
  return (
    <>
      <Head>
        <title>Reset Password Success Coach</title>
        <meta name="description" content="Reset Password Success Coach" />
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
      >
        <SuccessInfo userType={UserType.coach} />
      </SignUpSPLayout>
    </>
  );
}
