import { TypeSign, UserType } from '@/store/types/user';
import useMediaQuery from '@mui/material/useMediaQuery';
import jwt_decode from 'jwt-decode';
import Head from 'next/head';
import linkLogo from '../../../public/LOGO.svg';
import SignUp from '../../components/forms/sign_up/SignUp';
import SignUpSPLayout from '../../components/layouts/sign_up_sp/SignUpSPLayout';

export default function SignUpCoachStudent() {
  const matches = useMediaQuery('(min-width:900px)');

  const onSuccess = (res: any) => {
    console.log('====================================');
    console.log('[SignUpCoachStudent] onSuccess: res ', res);
    console.log('====================================');
    const userObject = jwt_decode(res.credential);
    //console.log(userObject);
    // localStorage.setItem('user', JSON.stringify(userObject));

    // const { name, sub, picture } = userObject;

    // const doc = {
    //   _id: sub,
    //   _type: 'user',
    //   userName: name,
    //   image: picture,
    // };

    console.log('====================================');
    console.log(' userObject =>', userObject);
    console.log('====================================');
  };

  const onFailure = (res: any) => {
    console.log('====================================');
    console.log('[SignUpCoachStudent] onFailure: res ', res);
    console.log('====================================');
  };

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
        <SignUp
          title={'I’m a Student'}
          userType={UserType.student}
          onSuccess={onSuccess}
          onError={onFailure}
        />
      </SignUpSPLayout>
    </>
  );
}
