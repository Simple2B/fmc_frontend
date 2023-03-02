import Head from 'next/head';
import linkLogo from '../../../public/fmc_logo.png';
import SignUpStartPage from '../../components/forms/sign_up_start_page/SignUpStartPage';
import SignUpSPLayout from '../../components/layouts/sign_up_sp_layout/SignUpSPLayout';

export default function SignUpCoachStudent() {
  return (
    <>
      <Head>
        <title>Sign Up Coach Student</title>
        <meta name="description" content="Sign Up Coach Student" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignUpSPLayout
        linkBackgroundImg={'../../../img/young-basketball-bg.png'}
        wrapperClassName={'boxWithBackgroundStartPage'}
        linkLogo={linkLogo}
        color={'#fff'}
      >
        <SignUpStartPage />
      </SignUpSPLayout>
    </>
  );
}
