import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import PasswordInput from '../../../../common/input_password/PasswordInput';
import style from './ResetPassword.module.sass';

import Loader from '@/common/loader/Loader';
import MessageBox from '@/common/message_box/MessageBox';
import CustomModel from '@/common/modal/Modal';
import { coachClientApi } from '@/fast_api_backend/api/usersInstance/coach/coachInstance';
import { studentClientApi } from '@/fast_api_backend/api/usersInstance/student/studentInstance';
import { checkedPassword } from '@/helper/checked_password';
import { getErrorMessage } from '@/helper/error_function';
import { UserType } from '@/store/types/user';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';

export interface IResetPassword {
  userType: string;
}

// eslint-disable-next-line no-empty-pattern
const ResetPassword: React.FC<IResetPassword> = ({ userType }) => {
  const router = useRouter();

  const [isLoad, setIsLoad] = React.useState<boolean>(false);
  const [isSuccess, setSuccess] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const [password, setPassword] = useState<string>('');
  const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false);
  const [errorPasswordMessage, setErrorPasswordMessage] = useState<string>('');

  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [isErrorPasswordConfirm, setIsErrorPasswordConfirm] =
    useState<boolean>(false);
  const [errorPasswordConfirmMessage, setErrorPasswordConfirmMessage] =
    useState<string>('');

  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [hidePasswordConfirm, setHidePasswordConfirm] = useState<boolean>(true);

  const handleChange = (
    // eslint-disable-next-line no-unused-vars
    setPasswordState: (p: string) => void,
    e: { target: { value: string } }
  ) => {
    setPasswordState(e.target.value);
  };

  useEffect(() => {
    checkedPassword(
      password,
      passwordConfirm,
      setIsErrorPassword,
      setErrorPasswordMessage,
      setIsErrorPasswordConfirm,
      setErrorPasswordConfirmMessage
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password, passwordConfirm]);

  const showPassword = (
    // eslint-disable-next-line no-unused-vars
    setPasswordHideState: (arg0: (prevState: boolean) => boolean) => void
  ) => {
    setPasswordHideState((prevState: boolean) => !prevState);
  };

  const submitRegistration = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoad(true);
    setSuccess(false);
    setIsErrorPassword(false);
    setErrorPasswordMessage('');
    setIsErrorPasswordConfirm(false);
    setErrorPasswordConfirmMessage('');

    checkedPassword(
      password,
      passwordConfirm,
      setIsErrorPassword,
      setErrorPasswordMessage,
      setIsErrorPasswordConfirm,
      setErrorPasswordConfirmMessage
    );

    if (password === passwordConfirm) {
      const verification_token = router.asPath.split('?token=')[1];

      const data = { password: password, password1: passwordConfirm };
      const ResetPassword = async () => {
        try {
          if (userType === UserType.student) {
            const response = await studentClientApi.studentResetPassword(
              data,
              verification_token
            );
            console.log('[ResetPassword]: student ', response);
            setIsLoad(false);
            setSuccess(true);
            router.push('/reset_password/success/student');
          }
          if (userType === UserType.coach) {
            const response = await coachClientApi.coachResetPassword(
              data,
              verification_token
            );
            console.log('[ResetPassword]: coach ', response);
            setIsLoad(false);
            setSuccess(true);
            router.push('/reset_password/success/coach');
          }
        } catch (error: any) {
          if (userType === UserType.coach) {
            console.log(`POST [ResetPassword] coach error message: ${error}`);
          }
          if (userType === UserType.student) {
            console.log(
              `POST [ResetPassword] student error message ===> : ${error}`
            );
          }
          router.push('/');
          setIsLoad(false);
          setSuccess(false);
          getErrorMessage(error, setError, 'resetPass');
        }
      };
      ResetPassword();
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
        <Typography className={style.title}>Reset your password</Typography>
        <Box sx={{ mt: '24px' }}>
          <Typography className={style.description}>
            Enter the email address you used when you joined and we’ll send you
            instructions to reset your password.
          </Typography>
        </Box>
        <Box
          component="form"
          noValidate
          onSubmit={submitRegistration}
          sx={{ mt: 1, position: 'relative', width: '100%' }}
          className={style.form}
        >
          <PasswordInput
            label="Password"
            value={password}
            setPassword={setPassword}
            hidePassword={hidePassword}
            handleChange={handleChange}
            showPassword={showPassword}
            setHidePassword={setHidePassword}
            isError={isErrorPassword}
            helperText={errorPasswordMessage}
          />
          <PasswordInput
            label="Password confirm"
            value={passwordConfirm}
            setPassword={setPasswordConfirm}
            hidePassword={hidePasswordConfirm}
            handleChange={handleChange}
            showPassword={showPassword}
            setHidePassword={setHidePasswordConfirm}
            isError={isErrorPasswordConfirm}
            helperText={errorPasswordConfirmMessage}
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
            disabled={
              (password === '' && passwordConfirm === '') ||
              password !== passwordConfirm
                ? true
                : false
            }
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
            message={error}
            handleClick={() => setModalIsOpen(!modalIsOpen)}
          />
        </CustomModel>
      )}
    </Box>
  );
};

export default ResetPassword;
