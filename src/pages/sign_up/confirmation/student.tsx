import useMediaQuery from '@mui/material/useMediaQuery';
import Head from 'next/head';
import linkLogo from '../../../../public/LOGO.svg';
import Confirmation from '../../../components/forms/sign_up/confirmation/Confirmation';
import SignUpSPLayout from '../../../components/layouts/sign_up_sp/SignUpSPLayout';
import { UserType } from '../../../store/types/user';

export default function ConfirmationStudent() {
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
        color={'#fff'}
        userType={UserType.student}
      >
        <Confirmation title={'Welcome!'} userType={UserType.student} />
      </SignUpSPLayout>
    </>
  );
}
