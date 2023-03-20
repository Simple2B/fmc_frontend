/* eslint-disable no-unused-vars */
import Input from '@/common/input/Input';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import * as React from 'react';
import styles from './ChangePassword.module.sass';

const nameInputStyles = {
  mt: 4,
  '& .MuiInputBase-root': {
    position: 'relative',
  },
  '& .MuiFormHelperText-root': {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: '-20px',
  },
};

export interface IChangePassword {
  userType: string;
}

const ChangePassword: React.FC<IChangePassword> = ({ userType }) => {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = React.useState<string>('');
  const [errorCurrentPasswordMessage, setErrorCurrentPasswordMessage] =
    React.useState<string>('');
  const [isErrorCurrentPassword, setIsErrorCurrentPassword] =
    React.useState<boolean>(false);

  const [currentPassword2, setCurrentPassword2] = React.useState<string>('');
  const [errorCurrentPasswordMessage2, setErrorCurrentPasswordMessage2] =
    React.useState<string>('');
  const [isErrorCurrentPassword2, setIsErrorCurrentPassword2] =
    React.useState<boolean>(false);

  const [verifyPassword, setVerifyPassword] = React.useState<string>('');
  const [errorVerifyPasswordMessage, setErrorVerifyPasswordMessage] =
    React.useState<string>('');
  const [isErrorVerifyPassword, setIsErrorVerifyPassword] =
    React.useState<boolean>(false);

  const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (!modalIsOpen) {
      setTimeout(() => {
        setModalIsOpen(true);
        // setError(null);
      }, 1000);
    }
  }, [modalIsOpen]);

  const handleOnChange = (
    e: { target: { value: string } },
    setName: (arg0: any) => void,
    setIsErrorName: (arg0: boolean) => void,
    setErrorNameMessage: (arg0: string) => void
  ) => {
    setName(e.target.value);
    if (e.target.value !== '') {
      setIsErrorName(false);
      setErrorNameMessage('');
    } else {
      setIsErrorName(true);
      setErrorNameMessage('Field cannot be empty');
    }
  };

  return (
    <Box className={styles.wrapperChangePassword}>
      <Box className={styles.title}>Change password</Box>
      <Box className={styles.inputs} sx={{ gap: 1 }}>
        <Box className={styles.inputBox}>
          <Input
            helperText={errorCurrentPasswordMessage}
            isError={isErrorCurrentPassword}
            name={'currentPassword'}
            label={'Current password'}
            value={currentPassword}
            sx={nameInputStyles}
            onChange={(e) =>
              handleOnChange(
                e,
                setCurrentPassword,
                setIsErrorCurrentPassword,
                setErrorCurrentPasswordMessage
              )
            }
            type="text"
          />
        </Box>
        <Box className={styles.inputBox}>
          <Input
            helperText={errorCurrentPasswordMessage2}
            isError={isErrorCurrentPassword2}
            name={'currentPassword2'}
            label={'Current password'}
            value={currentPassword2}
            sx={nameInputStyles}
            onChange={(e) =>
              handleOnChange(
                e,
                setCurrentPassword2,
                setIsErrorCurrentPassword2,
                setErrorCurrentPasswordMessage2
              )
            }
            type="text"
          />
        </Box>

        <Box className={styles.inputBox}>
          <Input
            helperText={errorVerifyPasswordMessage}
            isError={isErrorVerifyPassword}
            name={'verifyPassword'}
            label={'Verify password'}
            value={verifyPassword}
            sx={nameInputStyles}
            onChange={(e) =>
              handleOnChange(
                e,
                setVerifyPassword,
                setIsErrorVerifyPassword,
                setErrorVerifyPasswordMessage
              )
            }
            type="text"
          />
        </Box>
      </Box>
      <Box className={styles.btn}>
        {/* <Button
          onClick={submitRegistration}
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
          Save
        </Button> */}
        <Box className={styles.btnSave}>Save</Box>
      </Box>
    </Box>
  );
};

export default ChangePassword;
