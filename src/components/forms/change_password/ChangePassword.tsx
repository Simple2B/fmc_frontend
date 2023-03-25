/* eslint-disable no-unused-vars */
import PasswordInput from '@/common/input_password/PasswordInput';
import Loader from '@/common/loader/Loader';
import MessageBox from '@/common/message_box/MessageBox';
import CustomModel from '@/common/modal/Modal';
import { coachProfileApi } from '@/fast_api_backend/api/usersInstance/coach/profileInstance';
import { studentProfileApi } from '@/fast_api_backend/api/usersInstance/student/profileInstance';
import { checkedPassword } from '@/helper/checked_password';
import { getErrorMessage } from '@/helper/error_function';
import { UserType } from '@/store/types/user';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useEffect, useState } from 'react';
import styles from './ChangePassword.module.sass';

export interface IChangePassword {
  userType: string;
}

const ChangePassword: React.FC<IChangePassword> = ({ userType }) => {
  const matches600 = useMediaQuery('(max-width:600px)');

  const nameInputStyles = {
    mt: matches600 ? 1.5 : 4,
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

  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [errorCurrentPasswordMessage, setErrorCurrentPasswordMessage] =
    useState<string>('');
  const [isErrorCurrentPassword, setIsErrorCurrentPassword] =
    useState<boolean>(false);
  // setHideCurrentPassword

  const [hideCurrentPassword, setHideCurrentPassword] = useState<boolean>(true);

  const [password, setPassword] = useState<string>('');
  const [errorPasswordMessage, setErrorPasswordMessage] = useState<string>('');
  const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false);
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const [verifyPassword, setVerifyPassword] = useState<string>('');
  const [errorVerifyPasswordMessage, setErrorVerifyPasswordMessage] =
    useState<string>('');
  const [isErrorVerifyPassword, setIsErrorVerifyPassword] =
    useState<boolean>(false);
  const [hideVerifyPassword, setHideVerifyPassword] = useState<boolean>(true);

  const showPassword = (
    // eslint-disable-next-line no-unused-vars
    setPasswordHideState: (arg0: (prevState: boolean) => boolean) => void
  ) => {
    setPasswordHideState((prevState: boolean) => !prevState);
  };

  const handleChange = (
    // eslint-disable-next-line no-unused-vars
    setPasswordState: (p: string) => void,
    e: { target: { value: string } }
  ) => {
    setPasswordState(e.target.value);
  };

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(true);

  useEffect(() => {
    if (!modalIsOpen) {
      setTimeout(() => {
        setModalIsOpen(true);
        setError(null);
        setSuccess(false);
      }, 1000);
    }
  }, [modalIsOpen]);

  const closeSuccessMessage = () => {
    setModalIsOpen(!modalIsOpen);
    setSuccess(false);
    setCurrentPassword('');
    setPassword('');
    setVerifyPassword('');
  };

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

  const saveInfoForChangePassword = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    checkedPassword(
      password,
      verifyPassword,
      setIsErrorCurrentPassword,
      setErrorCurrentPasswordMessage,
      setIsErrorVerifyPassword,
      setErrorVerifyPasswordMessage
    );
    if (
      currentPassword !== '' &&
      password !== '' &&
      password === verifyPassword
    ) {
      const ChangePassword = async () => {
        const data = {
          old_password: currentPassword,
          new_password: password,
          new_password_confirmation: verifyPassword,
        };
        try {
          if (userType === UserType.student) {
            setIsLoad(true);
            const response = await studentProfileApi.changePasswordStudent(
              data
            );
            console.log('[ChangePassword]: student ', response);
            setIsLoad(false);
            setSuccess(true);
          }
          if (userType === UserType.coach) {
            setIsLoad(true);
            const response = await coachProfileApi.changePasswordCoach(data);
            console.log('[ChangePassword]: coach ', response);
            setIsLoad(false);
            setSuccess(true);
          }
        } catch (error: any) {
          if (userType === UserType.coach) {
            console.log(`POST [ChangePassword] coach error message: ${error}`);
          }
          if (userType === UserType.student) {
            console.log(
              `POST [ChangePassword] student error message ===> : ${error}`
            );
          }
          setIsLoad(false);
          setSuccess(false);
          getErrorMessage(error, setError, 'changePass');
        }
      };
      ChangePassword();
    }
  };

  return (
    <Box className={styles.wrapperChangePassword}>
      <Box className={styles.title}>Change password</Box>
      <Box className={styles.inputs} sx={{ gap: matches600 ? 0.3 : 1 }}>
        <Box className={styles.inputBox}>
          <PasswordInput
            label="Current password"
            value={currentPassword}
            setPassword={setCurrentPassword}
            hidePassword={hideCurrentPassword}
            handleChange={handleChange}
            showPassword={showPassword}
            setHidePassword={setHideCurrentPassword}
            isError={isErrorCurrentPassword}
            helperText={errorCurrentPasswordMessage}
          />
        </Box>
        <Box className={styles.inputBox}>
          <PasswordInput
            label="New password"
            value={password}
            setPassword={setPassword}
            hidePassword={hidePassword}
            handleChange={handleChange}
            showPassword={showPassword}
            setHidePassword={setHidePassword}
            isError={isErrorPassword}
            helperText={errorPasswordMessage}
          />
        </Box>
        <Box className={styles.inputBox}>
          <PasswordInput
            label="Confirm password"
            value={verifyPassword}
            setPassword={setVerifyPassword}
            hidePassword={hideVerifyPassword}
            handleChange={handleChange}
            showPassword={showPassword}
            setHidePassword={setHideVerifyPassword}
            isError={isErrorVerifyPassword}
            helperText={errorVerifyPasswordMessage}
          />
        </Box>
      </Box>
      <Box className={styles.btn}>
        <Box className={styles.btnSave} onClick={saveInfoForChangePassword}>
          Save
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

      {isSuccess && (
        <CustomModel isOpen={modalIsOpen} handleClick={closeSuccessMessage}>
          <MessageBox
            message={'Change password successfully'}
            handleClick={closeSuccessMessage}
          />
        </CustomModel>
      )}
    </Box>
  );
};

export default ChangePassword;
