/* eslint-disable no-unused-vars */
import Input from '@/common/input/Input';
import { Box, Button, Typography } from '@mui/material';
import * as React from 'react';
import PasswordInput from '../../../common/input_password/PasswordInput';

import style from './SignUp.module.sass';

const re = /\S+@\S+\.\S+/;

// eslint-disable-next-line no-unused-vars
export interface ISignUp {
  title: string;
  signUpType: string;
}

const SignUp: React.FC<ISignUp> = ({ title, signUpType }) => {
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
    // setIsErrorName(false);
    setErrorEmailMessage('');
    // setErrorNameMessage('');
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

    // if (name === '') {
    //   setIsErrorName(true);
    //   setErrorNameMessage('Name cannot be empty');
    // }

    if (email) {
      // const name = email.split('@')[0];
      const getRegistrationMessage = async () => {
        try {
          const response = '';
          // await instance().post('/sign_up', {
          //   email: email,
          //   username: name,
          // });
          console.log('POST [/sign_up] successfully', response);
          setIsLoad(false);
          setSuccess(true);
          // return response.data;
        } catch (error: any) {
          setIsLoad(false);
          setSuccess(false);
          setError('Email already exists');
          console.log(`POST [/sign_up] error message: ${error.message}`);
        }
      };
      getRegistrationMessage();
    }
  };

  const handleChange = (
    // eslint-disable-next-line no-unused-vars
    setPasswordState: (p: string) => void,
    e: { target: { value: string } }
  ) => {
    setPasswordState(e.target.value);
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
        <Typography className={style.title}>{title}</Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSignUp}
          sx={{ mt: 1, position: 'relative', width: '100%' }}
          className={style.form}
        >
          {/* {error && !isSuccess && (
          <Modal
            open={error !== null ? true : false}
            onClose={() => {
              setError(null);
              navigate('/auth#sign_in');
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ margin: '15% auto' }}
          >
            <Box
              sx={{
                width: '75%',
                margin: '0 auto',
                padding: '55px 30px',
                backgroundColor: '#151632',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '20px',
                zIndex: '100',
              }}
            >
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ color: '#f8dcdb', textAlign: 'center' }}
              >
                {`${error}`}
              </Typography>
            </Box>
          </Modal>
        )}
        {isLoad && (
          <Modal
            open={isLoad}
            onClose={() => console.log('Load false')}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
              margin: '15% auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '20px',
                zIndex: '100',
              }}
            >
              <Loader />
            </Box>
          </Modal>
        )}
        {isSuccess && (
          <Modal
            open={isSuccess}
            onClose={() => {
              setSuccess(false);
              navigate('/');
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ margin: '15% auto' }}
          >
            <Box
              sx={{
                width: '75%',
                margin: '0 auto',
                padding: '55px 30px',
                backgroundColor: '#151632',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '20px',
                zIndex: '100',
              }}
            >
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ color: '#f8dcdb', textAlign: 'center' }}
              >
                {`Please check your mail ${email}`}
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2, color: '#f8dcdb', textAlign: 'center' }}
              >
                You should receive a letter within 1 minute
              </Typography>
            </Box>
          </Modal>
        )} */}
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
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
