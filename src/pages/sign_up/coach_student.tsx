import { TypeSign, UserType } from '@/store/types/user';
import Head from 'next/head';
import linkLogo from '../../../public/LOGO(WHITE).svg';
import SignUpStartPage from '../../components/forms/sign_up_start_page/SignUpStartPage';
import SignUpSPLayout from '../../components/layouts/sign_up_sp/SignUpSPLayout';

export default function SignUpCoachStudent() {
  return (
    <>
      <Head>
        <title>Sign Up Coach Athlete</title>
        <meta name="description" content="Sign Up Coach Athlete" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignUpSPLayout
        linkBackgroundImg={'../../../img/young-basketball-bg.png'}
        wrapperClassName={'boxWithBackgroundStartPage'}
        linkLogo={linkLogo}
        color={'#fff'}
        description={'Already have an account? Log in like a'}
        userType={UserType.student}
        typeSign={TypeSign.up}
      >
        <SignUpStartPage />
      </SignUpSPLayout>
    </>
  );
}
