/* eslint-disable no-unused-vars */
import Input from '@/common/input/Input';
import Loader from '@/common/loader/Loader';
import MessageBox from '@/common/message_box/MessageBox';
import CustomModel from '@/common/modal/Modal';
import { coachClientApi } from '@/fast_api_backend/api/usersInstance/coach/coachInstance';
import { studentClientApi } from '@/fast_api_backend/api/usersInstance/student/studentInstance';
import { getErrorMessage } from '@/helper/error_function';
import { UserType } from '@/store/types/user';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import * as React from 'react';

import style from './StartForgotPassword.module.sass';

const re = /\S+@\S+\.\S+/;

// eslint-disable-next-line no-unused-vars
export interface IStartForgotPassword {
  userType: string;
}

const StartForgotPassword: React.FC<IStartForgotPassword> = ({ userType }) => {
  const router = useRouter();

  const [email, setEmail] = React.useState<string>('');
  const [errorEmailMessage, setErrorEmailMessage] = React.useState<string>('');
  const [isErrorEmail, setIsErrorEmail] = React.useState<boolean>(false);

  const [isLoad, setIsLoad] = React.useState<boolean>(false);
  const [isSuccess, setSuccess] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = (e: { preventDefault: () => void }) => {
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
      const data = { email: email };
      const getMessage = async () => {
        try {
          if (userType === UserType.student) {
            const response = await studentClientApi.studentForgotPassword(data);
            console.log('[StartForgotPassword]: student ', response);
            setIsLoad(false);
            setSuccess(true);
            router.push({
              pathname: '/forgot_password/info_student',
              query: email,
            });
          }
          if (userType === UserType.coach) {
            const response = await coachClientApi.coachForgotPassword(data);
            console.log('[StartForgotPassword]: coach ', response);
            setIsLoad(false);
            setSuccess(true);
            router.push({
              pathname: '/forgot_password/info_coach',
              query: email,
            });
          }
        } catch (error: any) {
          if (userType === UserType.coach) {
            router.push('/forgot_password/start_coach');
            console.log(
              `POST [/forgot_password] coach error message: ${error}`
            );
            setIsLoad(false);
            setSuccess(false);
            getErrorMessage(error, setError);
          }
          if (userType === UserType.student) {
            router.push('/forgot_password/start_student');
            console.log(
              `POST [/forgot_password] student error message ===> : ${error}`
            );
            setIsLoad(false);
            setSuccess(false);
            getErrorMessage(error, setError);
          }
        }
      };
      getMessage();
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
        <Typography className={style.title}>Forgot password?</Typography>
        <Box sx={{ pt: '28px', pb: '10px' }}>
          <Typography className={style.description}>
            Enter the email address you used when you joined and we’ll send you
            instructions to reset your password.
          </Typography>
        </Box>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 1, position: 'relative', width: '100%' }}
          className={style.form}
        >
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
            Reset password
          </Button>
        </Box>
      </Box>
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
    </Box>
  );
};

export default StartForgotPassword;
