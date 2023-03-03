import SuccessSignUp from '@/components/success_sign_up/SuccessSignUp';
import useMediaQuery from '@mui/material/useMediaQuery';
import Head from 'next/head';
import linkLogo from '../../../public/fmc_logo.png';
import SignUpSPLayout from '../../components/layouts/sign_up_sp_layout/SignUpSPLayout';

export default function SuccessStudent() {
  const matches = useMediaQuery('(min-width:900px)');
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
      >
        <SuccessSignUp email={'test@email.com'} />
      </SignUpSPLayout>
    </>
  );
}
