/* eslint-disable no-unused-vars */
import GoogleLoginBtn from '@/components/google_login/GoogleLogin';
import { getErrorMessage } from '@/helper/error_function';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import * as React from 'react';
import Input from '../../../common/input/Input';
import PasswordInput from '../../../common/input_password/PasswordInput';
import Loader from '../../../common/loader/Loader';
import MessageBox from '../../../common/message_box/MessageBox';
import CustomModel from '../../../common/modal/Modal';
import { coachClientApi } from '../../../fast_api_backend/api/usersInstance/coach/coachInstance';
import { studentClientApi } from '../../../fast_api_backend/api/usersInstance/student/studentInstance';
import { UserType } from '../../../store/types/user';

import style from './SignUp.module.sass';

const re = /\S+@\S+\.\S+/;

// eslint-disable-next-line no-unused-vars
export interface ISignUp {
  title: string;
  userType: string;
  onSuccess: any;
  onError?: any;
  typeSign: string;
}

const SignUp: React.FC<ISignUp> = ({
  title,
  userType,
  onSuccess,
  onError,
  typeSign,
}) => {
  const router = useRouter();
  const [name, setName] = React.useState<string>('');
  const [errorNameMessage, setErrorNameMessage] = React.useState<string>('');
  const [isErrorName, setIsErrorName] = React.useState<boolean>(false);

  const [password, setPassword] = React.useState<string>('');
  const [isErrorPassword, setIsErrorPassword] = React.useState<boolean>(false);
  const [errorPasswordMessage, setErrorPasswordMessage] =
    React.useState<string>('');

  const [hidePassword, setHidePassword] = React.useState<boolean>(true);

  const showPassword = (
    // eslint-disable-next-line no-unused-vars
    setPasswordHideState: (arg0: (prevState: boolean) => boolean) => void
  ) => {
    setPasswordHideState((prevState: boolean) => !prevState);
  };

  const [email, setEmail] = React.useState<string>('');
  const [errorEmailMessage, setErrorEmailMessage] = React.useState<string>('');
  const [isErrorEmail, setIsErrorEmail] = React.useState<boolean>(false);

  const [isLoad, setIsLoad] = React.useState<boolean>(false);
  const [isSuccess, setSuccess] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSignUp = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSuccess(false);
    setIsLoad(true);
    setIsErrorEmail(false);
    setErrorEmailMessage('');
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

    if (email) {
      const data = {
        email: email,
        username: name,
        password: password,
      };
      const getRegistrationMessage = async (userType: string) => {
        try {
          if (userType === UserType.coach) {
            const response = await coachClientApi.signUpCoach(data);
            console.log('POST [/sign_up] coach successfully', response);
            setIsLoad(false);
            setSuccess(true);
            router.push({
              pathname: '/sign_up/success_coach',
              query: email,
            });
          }
          if (userType === UserType.student) {
            const response = await studentClientApi.signUpStudent(data);
            setIsLoad(false);
            setSuccess(true);
            console.log('POST [/sign_up] student successfully', response);
            router.push({
              pathname: '/sign_up/success_student',
              query: email,
            });
          }
          // setSuccess(true);
        } catch (error: any) {
          setIsLoad(false);
          // setSuccess(false);

          if (userType === UserType.coach) {
            router.push('/sign_up/coach');
            console.log(
              `POST [/sign_up] coach error message: ${error.message}`
            );
            setSuccess(false);
            getErrorMessage(error.message, setError);
          }
          if (userType === UserType.student) {
            router.push('/sign_up/student');
            console.log(`POST [/sign_up] student error message: ${error}`);
            setSuccess(false);
            getErrorMessage(error.message, setError);
          }
          console.log(`POST [/sign_up] error message: ${error.message}`);
        }
      };
      getRegistrationMessage(userType);
    }
  };

  const handleChange = (
    // eslint-disable-next-line no-unused-vars
    setPasswordState: (p: string) => void,
    e: { target: { value: string } }
  ) => {
    setPasswordState(e.target.value);
  };

  const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (!modalIsOpen) {
      setTimeout(() => {
        setModalIsOpen(true);
        setError(null);
      }, 1000);
    }
  }, [modalIsOpen, error]);

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
          onSubmit={handleSignUp}
          sx={{ mt: 1, position: 'relative', width: '100%' }}
          className={style.form}
        >
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
          <Input
            helperText={errorEmailMessage}
            isError={isErrorEmail}
            name={'email'}
            label={'Email'}
            value={email}
            sx={{ mt: 2 }}
            onChange={(e) => {
              setEmail(e.target.value);
              if (e.target.value !== '') {
                setIsErrorEmail(false);
                setErrorEmailMessage('');
              } else {
                setIsErrorEmail(true);
                setErrorEmailMessage('Email cannot be empty');
              }
            }}
            type="email"
          />
          <Input
            helperText={errorNameMessage}
            isError={isErrorName}
            name={'name'}
            label={'Full name'}
            value={name}
            sx={{ mt: 4 }}
            onChange={(e) => {
              setName(e.target.value);
              if (e.target.value !== '') {
                setIsErrorName(false);
                setErrorNameMessage('');
              } else {
                setIsErrorName(true);
                setErrorNameMessage('Name cannot be empty');
              }
            }}
            type="text"
          />
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
            Sign up
          </Button>
          <div className={style.hr}>
            <div></div>
            <div style={{ color: '#717171' }}>Or</div>
            <div></div>
          </div>
          <Box sx={{ width: '100%' }}>
            <GoogleLoginBtn
              onSuccess={onSuccess}
              onError={onError}
              typeSign={typeSign}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
