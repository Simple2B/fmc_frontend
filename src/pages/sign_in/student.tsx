import Loader from '@/common/loader/Loader';
import MessageBox from '@/common/message_box/MessageBox';
import CustomModel from '@/common/modal/Modal';
import SignIn from '@/components/forms/sign_in/SignIn';
import { getErrorMessage } from '@/helper/error_function';
import { StudentAuthenticationService } from '@/services';
import { TypeSign, UserType } from '@/store/types/user';
import { IResponseStudentData } from '@/store/types/users/student/studentType';
import useMediaQuery from '@mui/material/useMediaQuery';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import linkLogo from '../../../public/LOGO(WHITE).svg';
import SignUpSPLayout from '../../components/layouts/sign_up_sp/SignUpSPLayout';

// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

export default function SignInStudent() {
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
        // const res = await studentAuthApi.googleAuthStudent(data);
        const res = await StudentAuthenticationService.apiStudentGoogleAuth(
          data
        );
        setIsLoad(false);
        setSuccess(true);
        localStorage.setItem(
          'token',
          (res as IResponseStudentData).access_token
        );
        localStorage.setItem('userType', UserType.student);
        localStorage.setItem('googleAuth', 'true');
        router.push({
          pathname: '/profiles/student',
          query: 'my_lessons',
        });
      } catch (error: any) {
        setIsLoad(false);
        setSuccess(false);
        console.log('StudentGoogleAuth: error ', error);
        localStorage.removeItem('googleAuth');
        getErrorMessage(error, setError);
        router.push('/sign_in/student');
      }
    };
    StudentGoogleAuth();
  };

  const onFailure = (res: any) => {
    console.log('[SignUpStudent] onFailure: res ', res);
    localStorage.removeItem('googleAuth');
    router.push('/sign_in/student');
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
        <title>Sign In Athlete</title>
        <meta name="description" content="Sign In Athlete" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script type="text/javascript">
        window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};
        heap.load("1803201951");
        </script>
      </Head>
      <SignUpSPLayout
        linkBackgroundImg={
          matches ? '../../../img/pexels-tima-miroshnichenko.png' : ' '
        }
        wrapperClassName={'boxWithBackgroundStudentPage'}
        linkLogo={linkLogo}
        color={'#000'}
        description={'Don’t have an account?'}
        userType={UserType.student}
        typeSign={TypeSign.in}
      >
        <SignIn
          title={'Welcome back'}
          userType={UserType.student}
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
