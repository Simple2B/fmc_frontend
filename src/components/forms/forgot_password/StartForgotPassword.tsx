/* eslint-disable no-unused-vars */
import Input from '@/common/input/Input';
import { Box, Button, Typography } from '@mui/material';
import * as React from 'react';

import style from './StartForgotPassword.module.sass';

const re = /\S+@\S+\.\S+/;

// eslint-disable-next-line no-unused-vars
export interface IStartForgotPassword {
  userType: string;
}

const StartForgotPassword: React.FC<IStartForgotPassword> = ({ userType }) => {
  console.log('StartForgotPassword: userType => ', userType);

  const [email, setEmail] = React.useState<string>('');
  const [errorEmailMessage, setErrorEmailMessage] = React.useState<string>('');
  const [isErrorEmail, setIsErrorEmail] = React.useState<boolean>(false);

  const [isLoad, setIsLoad] = React.useState<boolean>(false);
  const [isSuccess, setSuccess] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  //   const handleSignUp = (e: { preventDefault: () => void }) => {
  //     e.preventDefault();
  //     setSuccess(false);
  //     setIsLoad(true);
  //     setIsErrorEmail(false);
  //     // setIsErrorName(false);
  //     setErrorEmailMessage('');
  //     // setErrorNameMessage('');
  //     if (email === '') {
  //       setIsErrorEmail(true);
  //       setErrorEmailMessage('Email cannot be empty');
  //     }

  //     if (re.test(email.toLowerCase())) {
  //       setIsErrorEmail(false);
  //       setErrorEmailMessage('');
  //     } else {
  //       setIsErrorEmail(true);
  //       setErrorEmailMessage('Email is not valid');
  //     }

  //     // if (name === '') {
  //     //   setIsErrorName(true);
  //     //   setErrorNameMessage('Name cannot be empty');
  //     // }

  //     if (email) {
  //       // const name = email.split('@')[0];
  //       const getRegistrationMessage = async () => {
  //         try {
  //           const response = '';
  //           // await instance().post('/sign_up', {
  //           //   email: email,
  //           //   username: name,
  //           // });
  //           console.log('POST [/sign_up] successfully', response);
  //           setIsLoad(false);
  //           setSuccess(true);
  //           // return response.data;
  //         } catch (error: any) {
  //           setIsLoad(false);
  //           setSuccess(false);
  //           setError('Email already exists');
  //           console.log(`POST [/sign_up] error message: ${error.message}`);
  //         }
  //       };
  //       getRegistrationMessage();
  //     }
  //   };

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
          //   onSubmit={handleSignUp}
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
    </Box>
  );
};

export default StartForgotPassword;
