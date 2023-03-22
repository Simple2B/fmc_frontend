import Loader from '@/common/loader/Loader';
import MessageBox from '@/common/message_box/MessageBox';
import CustomModel from '@/common/modal/Modal';
import { studentAuthApi } from '@/fast_api_backend/api/authApi/student/authApi';
import { getErrorMessage } from '@/helper/error_function';
import { TypeSign, UserType } from '@/store/types/user';
import { IResponseStudentData } from '@/store/types/users/student/studentType';
import useMediaQuery from '@mui/material/useMediaQuery';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import linkLogo from '../../../public/LOGO.svg';
import SignUp from '../../components/forms/sign_up/SignUp';
import SignUpSPLayout from '../../components/layouts/sign_up_sp/SignUpSPLayout';

export default function SignUpStudent() {
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
    const StudentGoogleAuth = async () => {
      setIsLoad(true);
      try {
        const res = await studentAuthApi.googleAuthStudent(data);
        setIsLoad(false);
        setSuccess(true);
        console.log('StudentGoogleAuth: res ', res);
        localStorage.setItem(
          'token',
          (res as IResponseStudentData).access_token
        );
        localStorage.setItem('userType', UserType.student);
        router.push({
          pathname: '/profiles/student',
          query: 'my_lessons',
        });
      } catch (error: any) {
        setIsLoad(false);
        setSuccess(false);
        console.log('StudentGoogleAuth: error ', error);
        getErrorMessage(error, setError);
        router.push('/sign_up/student');
      }
    };
    StudentGoogleAuth();
  };

  const onFailure = (res: any) => {
    console.log('[SignUpStudent] onFailure: res ', res);
    router.push('/sign_up/student');
    setSuccess(false);
    getErrorMessage(res, setError);
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
        <title>Sign Up Athlete</title>
        <meta name="description" content="Sign Up Athlete" />
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
          title={'I’m a Athlete'}
          userType={UserType.student}
          onSuccess={onSuccess}
          onError={onFailure}
          typeSign={TypeSign.up}
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
              error={error}
              handleClick={() => setModalIsOpen(!modalIsOpen)}
            />
          </CustomModel>
        )}
      </SignUpSPLayout>
    </>
  );
}
