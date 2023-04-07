import GoogleLoginBtn from '@/components/google_login/GoogleLogin';
import { getErrorMessage } from '@/helper/error_function';
import {
  CoachAuthenticationService,
  StudentAuthenticationService,
} from '@/services';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Input from '../../../common/input/Input';
import PasswordInput from '../../../common/input_password/PasswordInput';
import Loader from '../../../common/loader/Loader';
import MessageBox from '../../../common/message_box/MessageBox';
import CustomModel from '../../../common/modal/Modal';
import { UserType } from '../../../store/types/user';
import { IResponseCoachData } from '../../../store/types/users/coach/coachType';
import { IResponseStudentData } from '../../../store/types/users/student/studentType';
import style from './SignIn.module.sass';

const re = /\S+@\S+\.\S+/;

export interface ISignIn {
  title: string;
  userType: string;
  // eslint-disable-next-line no-unused-vars
  onSuccess: any;
  // eslint-disable-next-line no-unused-vars
  onFailure?: any;
  typeSign: string;
}

// eslint-disable-next-line no-empty-pattern
const SignIn: React.FC<ISignIn> = ({
  title,
  userType,
  onSuccess,
  onFailure,
  typeSign,
}) => {
  // const { googleClientId, appleKeyId } = useContext(AuthContext);
  // const matches = useMediaQuery('(min-width:600px)');

  const router = useRouter();
  const [isLoad, setIsLoad] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isSuccess, setSuccess] = React.useState<boolean>(false);

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
    setSuccess(false);
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
      const signIn = async (userType: string) => {
        setIsLoad(true);
        try {
          if (userType === UserType.coach) {
            // const coachToken = await coachAuthApi.signInCoach(email, password);
            const coachToken = await CoachAuthenticationService.apiCoachLogin({
              username: email,
              password,
            });
            console.log('POST [/sign_in] coach successfully', coachToken);
            localStorage.setItem(
              'token',
              (coachToken as IResponseCoachData).access_token
            );
            router.push('/profiles/coach?my_appointments');
            setIsLoad(false);
            setSuccess(true);
          }
          if (userType === UserType.student) {
            // const studentToken = await studentAuthApi.signInStudent(
            //   email,
            //   password
            // );
            const studentToken =
              await StudentAuthenticationService.apiStudentLogin({
                username: email,
                password,
              });
            localStorage.setItem(
              'token',
              (studentToken as IResponseStudentData).access_token
            );
            setIsLoad(false);
            setSuccess(true);
            router.push('/profiles/student?my_lessons');
          }
          localStorage.setItem('userType', userType);
        } catch (error: any) {
          if (userType === UserType.coach) {
            router.push('/sign_in/coach');
            console.log(`POST [/sign_in] coach error message: ${error}`);
            setSuccess(false);
            getErrorMessage(error, setError);
          }
          if (userType === UserType.student) {
            router.push('/sign_in/student');
            console.log(
              `POST [/sign_in] student error message ===> : ${error}`
            );
            setSuccess(false);
            getErrorMessage(error, setError);
          }
          setIsLoad(false);
        }
      };
      signIn(userType);
    }
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
          onSubmit={handleSubmit}
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
        </Box>
        <Box sx={{ width: '100%' }}>
          <GoogleLoginBtn
            onSuccess={onSuccess}
            onError={onFailure}
            typeSign={typeSign}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;
