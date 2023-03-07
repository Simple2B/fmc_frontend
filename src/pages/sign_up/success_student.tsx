import SuccessSignUp from '@/components/success_sign_up/SuccessSignUp';
import { TypeSign, UserType } from '@/store/types/user';
import useMediaQuery from '@mui/material/useMediaQuery';
import Head from 'next/head';
import { useRouter } from 'next/router';
import linkLogo from '../../../public/LOGO.svg';
import SignUpSPLayout from '../../components/layouts/sign_up_sp/SignUpSPLayout';

export default function SuccessStudent() {
  const matches = useMediaQuery('(min-width:900px)');
  const router = useRouter();
  const email = router.asPath.split('?')[1];

  return (
    <>
      <Head>
        <title>Sign Up Student</title>
        <meta name="description" content="Sign Up Student" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignUpSPLayout
        linkBackgroundImg={
          matches ? '../../../img/young-basketball-bg-student.jpg' : ' '
        }
        wrapperClassName={'boxWithBackgroundStudentPage'}
        linkLogo={linkLogo}
        color={'#000'}
        description={'Already have an account? Log in like a'}
        userType={UserType.student}
        typeSign={TypeSign.up}
      >
        <SuccessSignUp email={email} />
      </SignUpSPLayout>
    </>
  );
}
