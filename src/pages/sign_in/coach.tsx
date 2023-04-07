import Loader from '@/common/loader/Loader';
import MessageBox from '@/common/message_box/MessageBox';
import CustomModel from '@/common/modal/Modal';
import SignIn from '@/components/forms/sign_in/SignIn';
// import { coachAuthApi } from '@/fast_api_backend/api/authApi/coach/authApi';
import { getErrorMessage } from '@/helper/error_function';
import { CoachAuthenticationService } from '@/services';
import { TypeSign, UserType } from '@/store/types/user';
import { IResponseStudentData } from '@/store/types/users/student/studentType';
import useMediaQuery from '@mui/material/useMediaQuery';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import linkLogo from '../../../public/LOGO(WHITE).svg';
import SignUpSPLayout from '../../components/layouts/sign_up_sp/SignUpSPLayout';

export default function SignInCoach() {
  const matches = useMediaQuery('(min-width:900px)');

  const router = useRouter();

  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // google success login
  const onSuccess = (res: any) => {
    const data = {
      email: res.profileObj.email ?? '',
      username: res.profileObj.name ?? '',
      google_openid_key: res.profileObj.googleId ?? '',
      picture: res.profileObj.imageUrl ?? '',
    };

    // save user data from google to fast api db
    const CoachGoogleAuth = async () => {
      setIsLoad(true);
      try {
        const res = await CoachAuthenticationService.apiCoachGoogleAuth(data);
        // const res = await coachAuthApi.googleAuthCoach(data);
        setIsLoad(false);
        setSuccess(true);
        // console.log('CoachGoogleAuth: res ', res);
        localStorage.setItem(
          'token',
          (res as IResponseStudentData).access_token
        );
        localStorage.setItem('userType', UserType.coach);
        localStorage.setItem('googleAuth', 'true');
        router.push({
          pathname: '/profiles/coach',
          query: 'my_appointments',
        });
      } catch (error: any) {
        setIsLoad(false);
        setSuccess(false);
        console.log('CoachGoogleAuth: error ', error);
        localStorage.removeItem('googleAuth');
        getErrorMessage(error, setError);
        router.push('/sign_in/coach');
      }
    };
    CoachGoogleAuth();
  };

  const onFailure = (res: any) => {
    console.log('[SignInCoach] onFailure: res ', res);
    router.push('/sign_in/coach');
    localStorage.removeItem('googleAuth');
    setSuccess(false);
    // getErrorMessage(res, setError);
  };

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(true);

  useEffect(() => {
    if (!modalIsOpen) {
      setTimeout(() => {
        setModalIsOpen(true);
        setError(null);
      }, 1000);
    }
  }, [modalIsOpen, error]);

  return (
    <>
      <Head>
        <title>Sign In Coach</title>
        <meta name="description" content="Sign In Coach" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignUpSPLayout
        linkBackgroundImg={
          matches ? '../../../img/pexels-tima-miroshnichenko.png' : ' '
        }
        wrapperClassName={'boxWithBackgroundStudentPage'}
        linkLogo={linkLogo}
        color={'#000'}
        description={'Don’t have an account?'}
        userType={UserType.coach}
        typeSign={TypeSign.in}
      >
        <SignIn
          title={'Welcome back'}
          userType={UserType.coach}
          onSuccess={onSuccess}
          onFailure={onFailure}
          typeSign={TypeSign.in}
        />
        {isLoad && (
          <CustomModel isOpen={isLoad}>
            <Loader />
          </CustomModel>
        )}
        {error && !isSuccess && (
          <CustomModel
            isOpen={modalIsOpen}
            handleClick={() => setModalIsOpen(!modalIsOpen)}
          >
            <MessageBox
              message={error}
              handleClick={() => setModalIsOpen(!modalIsOpen)}
            />
          </CustomModel>
        )}
      </SignUpSPLayout>
    </>
  );
}
