import useMediaQuery from '@mui/material/useMediaQuery';
import Head from 'next/head';
import linkLogo from '../../../../public/LOGO.svg';
import Confirmation from '../../../components/forms/sign_up/confirmation/Confirmation';
import SignUpSPLayout from '../../../components/layouts/sign_up_sp/SignUpSPLayout';
import { UserType } from '../../../store/types/user';

export default function ConfirmationCoach() {
  const matches = useMediaQuery('(min-width:900px)');
  return (
    <>
      <Head>
        <title>Confirmation Coach</title>
        <meta name="description" content="Confirmation Coach" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignUpSPLayout
        linkBackgroundImg={
          matches ? '../../../img/young-basketball-bg-coach.png' : ' '
        }
        wrapperClassName={'boxWithBackgroundStudentPage'}
        linkLogo={linkLogo}
        color={'#fff'}
        userType={UserType.coach}
      >
        <Confirmation title={'Welcome!'} userType={UserType.coach} />
      </SignUpSPLayout>
    </>
  );
}
