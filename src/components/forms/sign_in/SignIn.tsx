import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import style from './SignIn.module.sass';
// import { GoogleLogin } from 'react-google-login';
import Input from '../../../common/input/Input';
import PasswordInput from '../../../common/input_password/PasswordInput';

import { UserType } from '@/store/types/user';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
// import Loader from '../../common/Loader/Loader';
// import googleIcon from '../../../img/7123025_logo_google_g_icon.svg';

const re = /\S+@\S+\.\S+/;

export interface ISignIn {
  title: string;
  userType: string;
}

// eslint-disable-next-line no-empty-pattern
const SignIn: React.FC<ISignIn> = ({ title, userType }) => {
  // const { googleClientId, appleKeyId } = useContext(AuthContext);
  // const matches = useMediaQuery('(min-width:600px)');

  console.log('====================================');
  console.log('SignIn: userType', userType);
  console.log('====================================');

  const [email, setEmail] = useState<string>('');
  const [errorEmailMessage, setErrorEmailMessage] = useState<string>('');
  const [isErrorEmail, setIsErrorEmail] = useState<boolean>(false);

  const [password, setPassword] = useState<string>('');
  const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false);
  const [errorPasswordMessage, setErrorPasswordMessage] = useState<string>('');

  const [hidePassword, setHidePassword] = useState<boolean>(true);

  // const [emailForgotPassword, setEmailForgotPassword] = useState<string>('');

  // const [isForgotPasswordForm, setIsForgotPasswordForm] =
  //   useState<boolean>(false);
  // const [errorEmailForgotPasswordMessage, setErrorEmailForgotPasswordMessage] =
  //   useState<string>('');
  // const [isErrorEmailForgotPassword, setIsErrorEmailForgotPassword] =
  //   useState<boolean>(false);

  // const keys = useContext(AuthContext);

  // const [subscriptions, setSubscription] = useState<ISubscriptions[]>([]);

  const handleChange = (
    // eslint-disable-next-line no-unused-vars
    setPasswordState: (p: string) => void,
    e: { target: { value: string } }
  ) => {
    setPasswordState(e.target.value);
  };

  // eslint-disable-next-line no-unused-vars
  const showPassword = (
    // eslint-disable-next-line no-unused-vars
    setPasswordHideState: (arg0: (prevState: boolean) => boolean) => void
  ) => {
    setPasswordHideState((prevState: boolean) => !prevState);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsErrorEmail(false);
    setIsErrorPassword(false);
    setErrorEmailMessage('');
    setErrorPasswordMessage('');

    if (email === '') {
      setIsErrorEmail(true);
      setErrorEmailMessage('Email cannot be empty');
    }

    if (re.test(email.toLowerCase())) {
      setIsErrorEmail(false);
      setErrorEmailMessage('');
    } else {
      setIsErrorEmail(true);
      setErrorEmailMessage('Email is not valid');
    }

    if (password === '') {
      setIsErrorPassword(true);
      setErrorPasswordMessage('Password cannot be empty');
    }
    if (email && password) {
      console.log({
        email: email,
        password: password,
      });
    }
    // const data = {
    //   email: email,
    //   password: password,
    // };
  };

  // const handleForgotPasswordSubmit = (
  //   event: React.FormEvent<HTMLFormElement>
  // ) => {
  //   event.preventDefault();
  //   // setIsLoadingForgotPassword(false);
  //   setIsErrorEmailForgotPassword(false);
  //   setErrorEmailForgotPasswordMessage('');
  //   // setSuccessForgotPassword(false);
  //   // setIsError(false);

  //   if (emailForgotPassword === '') {
  //     setIsErrorEmailForgotPassword(true);
  //     setErrorEmailForgotPasswordMessage('Email cannot be empty');
  //   }

  //   if (re.test(emailForgotPassword.toLowerCase())) {
  //     setIsErrorEmailForgotPassword(false);
  //     setErrorEmailForgotPasswordMessage('');
  //   } else {
  //     setIsErrorEmailForgotPassword(true);
  //     setErrorEmailForgotPasswordMessage('Email is not valid');
  //   }

  //   if (emailForgotPassword) {
  //     // setIsLoadingForgotPassword(true);
  //     const forgotPassword = async () => {
  //       // const res = await clientApi.forgotPassword({
  //       //   email: emailForgotPassword,
  //       // });
  //       // setIsLoadingForgotPassword(false);
  //       // if (Number(res) === 200) {
  //       //   setSuccessForgotPassword(true);
  //       //   setIsForgotPasswordForm(false);
  //       // } else {
  //       //   setSuccessForgotPassword(false);
  //       //   setIsError(true);
  //       // }
  //     };
  //     forgotPassword();
  //   }
  // };

  // const onSignInSuccess = (res: any) => {
  //   const data = {
  //     email: res.profileObj.email,
  //     username: res.profileObj.name,
  //     google_openid_key: res.profileObj.googleId,
  //     picture: res.profileObj.imageUrl,
  //   };
  //   console.log(' SignInSuccess: data => ', data);
  // };

  // const onFailure = (res: unknown) => {
  //   console.log('LOGIN FAILED! res', res);
  //   // setIsGoogleAuthSuccess(false);
  // };

  // const handleClickForgotPassword = () => {
  //   setIsForgotPasswordForm(true);
  // };

  // useEffect(() => {
  //   if (isLoggin) {
  //     setTimeout(() => {
  //       navigate('/profile');
  //     }, 2500);
  //   }
  // }, [isLoggin]);

  // useEffect(() => {
  //   if (error) {
  //     setTimeout(() => {
  //       navigate('/auth');
  //     }, 1500);
  //   }
  // }, [error]);

  // useEffect(() => {
  //   if (successForgotPassword) {
  //     setTimeout(() => {
  //       navigate('/');
  //     }, 2500);
  //   }
  // }, [successForgotPassword]);

  return (
    <Box className={style.wrapper}>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography className={style.title}>{title}</Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 1, position: 'relative', width: '100%' }}
          className={style.form}
        >
          {/* {error && !isLoggin && (
          <ModalWindow
            isOpen={error !== null ? true : false}
            navigate={navigate}
            navigationPath={'/auth'}
            type={'error'}
            children={error}
          />
        )}
        {loading && (
          <ModalWindow isOpen={loading} type={'load'} children={<Loader />} />
        )}
        {isLoggin && (
          <ModalWindow
            isOpen={isLoggin}
            navigate={navigate}
            navigationPath={'/profile/sensors'}
            type={'success'}
            children={'You are successfully logged in'}
          />
        )} */}
          <Input
            helperText={errorEmailMessage}
            isError={isErrorEmail}
            name={'email'}
            label={'Email'}
            value={email}
            type="email"
            sx={{ mt: 2 }}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => {
              setEmail(e.target.value);
              if (e.target.value !== '') {
                setIsErrorEmail(false);
                setErrorEmailMessage('');
              } else {
                setIsErrorEmail(true);
                setErrorEmailMessage('Email cannot be empty');
              }
            }}
          />
          <Box sx={{ position: 'relative' }}>
            <PasswordInput
              isError={isErrorPassword}
              helperText={errorPasswordMessage}
              label="Password"
              value={password}
              setPassword={setPassword}
              hidePassword={hidePassword}
              handleChange={handleChange}
              showPassword={showPassword}
              setHidePassword={setHidePassword}
            />
            <Link
              className={style.linkForgotPassword}
              href={`${
                userType === UserType.coach
                  ? '/forgot_password/start_coach'
                  : '/forgot_password/start_student'
              }`}
              // onClick={handleClickForgotPassword}
            >
              Forgot password? <span className={style.arrow}>&#8593;</span>
            </Link>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              borderRadius: '8px',
              width: '100%',
              height: '56px',
            }}
          >
            Sign In
          </Button>
          <div className={style.hr}>
            <div></div>
            <div style={{ color: '#717171' }}>Or</div>
            <div></div>
          </div>

          {/* <div className="socialContainer">
          {!!googleClientId && (
            <Link
              href="#google"
              className="social socialGoogle"
              onClick={() => console.log('Google login')}
            >
              <GoogleLogin
                clientId={keys.googleClientId}
                render={(renderProps) => {
                  return (
                    <img
                      src={googleIcon}
                      alt={'google icon'}
                      onClick={renderProps.onClick}
                    />
                  );
                }}
                onSuccess={onSignInSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                // isSignedIn={true}
              />
              <Box className="hoverBox">Sign in with Google</Box>
            </Link>
          )}
        </div> */}
        </Box>
        {/* {isForgotPasswordForm && (
        <Modal
          open={isForgotPasswordForm}
          onClose={() => setIsForgotPasswordForm(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: !matches ? '90%' : '55%',
              margin: '0 auto',
              padding: '55px 30px',
              backgroundColor: '#fff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '20px',
              zIndex: '100',
            }}
          >
            <Box
              component="form"
              noValidate
              onSubmit={handleForgotPasswordSubmit}
              sx={{ mt: 2, width: '100%', position: 'relative' }}
            >
              <Typography
                component="h1"
                variant="h5"
                sx={{ textAlign: 'center', mb: '10px' }}
              >
                Put your email
              </Typography>
              <Input
                helperText={errorEmailForgotPasswordMessage}
                isError={isErrorEmailForgotPassword}
                name={'emailForgotPassword'}
                label={'Email'}
                value={emailForgotPassword}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => {
                  setEmailForgotPassword(e.target.value);
                  if (e.target.value !== '') {
                    setIsErrorEmailForgotPassword(false);
                    setErrorEmailForgotPasswordMessage('');
                  } else {
                    setIsErrorEmailForgotPassword(true);
                    setErrorEmailForgotPasswordMessage('Email cannot be empty');
                  }
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  borderRadius: '8px',
                  width: '100%',
                  height: '56px',
                }}
              >
                Sign in
              </Button>
            </Box>
          </Box>
        </Modal>
      )} */}
        {/* {successForgotPassword && (
        <ModalWindow
          isOpen={successForgotPassword}
          navigate={navigate}
          navigationPath={'/'}
          type={'success'}
          children={`Check your ${emailForgotPassword}`}
        />
      )}
      {isLoadingForgotPassword && (
        <ModalWindow
          isOpen={isLoadingForgotPassword}
          type={'load'}
          children={<Loader />}
        />
      )}
      {isError && (
        <div
          onClick={() => setIsError(false)}
          style={{ backgroundColor: 'transparent' }}
        >
          <ModalWindow
            isOpen={isError}
            navigate={navigate}
            navigationPath={'/auth'}
            type={'error'}
            children={'Email not found'}
          />
        </div>
      )} */}
      </Box>
    </Box>
  );
};

export default SignIn;