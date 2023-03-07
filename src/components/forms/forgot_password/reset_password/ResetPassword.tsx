import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import PasswordInput from '../../../../common/input_password/PasswordInput';
import style from './ResetPassword.module.sass';

import Typography from '@mui/material/Typography';

export interface IResetPassword {
  userType: string;
}

// eslint-disable-next-line no-empty-pattern
const ResetPassword: React.FC<IResetPassword> = ({ userType }) => {
  // const { googleClientId, appleKeyId } = useContext(AuthContext);
  // const matches = useMediaQuery('(min-width:600px)');

  console.log('====================================');
  console.log('SignIn: userType', userType);
  console.log('====================================');

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

  const checkedPassword = () => {
    if (password === '') {
      setIsErrorPassword(true);
      setErrorPasswordMessage('Password cannot be empty');
    } else {
      setIsErrorPassword(false);
      setErrorPasswordMessage('');
    }

    if (passwordConfirm === '') {
      setIsErrorPasswordConfirm(true);
      setErrorPasswordConfirmMessage('Password cannot be empty');
    } else {
      setIsErrorPasswordConfirm(false);
      setErrorPasswordConfirmMessage('');
    }

    if (password !== passwordConfirm) {
      setIsErrorPasswordConfirm(true);
      setErrorPasswordConfirmMessage("Passwords don't match");
      // setIsLoad(false);
      // setSuccess(false);
      // setError(null);
    } else {
      setIsErrorPasswordConfirm(false);
      setErrorPasswordConfirmMessage('');
      // setIsLoad(false);
      // setError(null);
    }
  };

  useEffect(() => {
    checkedPassword();
  }, [password, passwordConfirm]);

  const showPassword = (
    // eslint-disable-next-line no-unused-vars
    setPasswordHideState: (arg0: (prevState: boolean) => boolean) => void
  ) => {
    setPasswordHideState((prevState: boolean) => !prevState);
  };

  const submitRegistration = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // setIsLoad(true);
    // setSuccess(false);
    setIsErrorPassword(false);
    setErrorPasswordMessage('');
    setIsErrorPasswordConfirm(false);
    setErrorPasswordConfirmMessage('');

    checkedPassword();

    if (password === passwordConfirm) {
      // if (userUUID) {
      //   const resetPasswordData = {
      //     verification_token: userUUID,
      //     password: password,
      //   };
      //   const resetPassword = async () => {
      //     try {
      //       // const response = await instance().post('/user/reset_password', resetPasswordData);
      //       // setIsLoad(false);
      //       // setSuccess(true);
      //       // return response.data;
      //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
      //     } catch (error: any) {
      //       // setIsLoad(false);
      //       // setSuccess(false);
      //       // setError('Something went wrong... Please sign up!');
      //     }
      //   };
      //   resetPassword();
      // }
    }
  };

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
          >
            Reset password
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPassword;
