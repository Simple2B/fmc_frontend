import SuccessSignUp from '@/components/success_sign_up/SuccessSignUp';
import { TypeSign, UserType } from '@/store/types/user';
import useMediaQuery from '@mui/material/useMediaQuery';
import Head from 'next/head';
import linkLogo from '../../../public/fmc_logo.png';
import SignUpSPLayout from '../../components/layouts/sign_up_sp_layout/SignUpSPLayout';

export default function SuccessCoach() {
  const matches = useMediaQuery('(min-width:900px)');
  return (
    <>
      <Head>
        <title>Sign Up Coach</title>
        <meta name="description" content="Sign Up Coach" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignUpSPLayout
        linkBackgroundImg={
          matches ? '../../../img/young-basketball-bg-coach.png' : ' '
        }
        wrapperClassName={'boxWithBackgroundStudentPage'}
        linkLogo={linkLogo}
        color={'#000'}
        description={'Already have an account? Log in like a'}
        userType={UserType.coach}
        typeSign={TypeSign.up}
      >
        <SuccessSignUp email={'test@email.com'} />
      </SignUpSPLayout>
    </>
  );
}
