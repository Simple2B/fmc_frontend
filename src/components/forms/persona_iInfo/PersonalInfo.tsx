/* eslint-disable no-unused-vars */
import Input from '@/common/input/Input';
import Loader from '@/common/loader/Loader';
import MessageBox from '@/common/message_box/MessageBox';
import CustomModel from '@/common/modal/Modal';
import DragDropFile from '@/common/upload_drag_and_drop_input/DragDropFile';
import { coachProfileApi } from '@/fast_api_backend/api/usersInstance/coach/profileInstance';
import { studentProfileApi } from '@/fast_api_backend/api/usersInstance/student/profileInstance';
import { getErrorMessage } from '@/helper/error_function';
import { IUserProfile, UserType } from '@/store/types/user';
import { Avatar, Typography, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import styles from './PersonalInfo.module.sass';

export interface IPersonalInfo {
  userType: string;
}

const PersonalInfo: React.FC<IPersonalInfo> = ({ userType }) => {
  const matches600 = useMediaQuery('(max-width:600px)');
  // const matches650 = useMediaQuery('(max-width:650px)');

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
  const [isLoad, setIsLoad] = React.useState<boolean>(false);
  const [isSuccess, setSuccess] = React.useState<boolean>(false);
  const [errorMessage, setError] = React.useState<string | null>(null);
  // const router = useRouter();
  const [name, setFirstName] = React.useState<string>('');
  const [errorNameMessage, setErrorFirstNameMessage] =
    React.useState<string>('');
  const [isErrorName, setIsErrorFirstName] = React.useState<boolean>(false);

  const [lastName, setLastName] = React.useState<string>('');
  const [errorLastNameMessage, setErrorLastNameMessage] =
    React.useState<string>('');
  const [isErrorLastName, setIsErrorLastName] = React.useState<boolean>(false);

  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');

  // profilePicture

  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const savePersonalInfo = () => {
    if (name === '') {
      setIsErrorFirstName(true);
      setErrorFirstNameMessage('Name cannot be empty');
    } else {
      setIsErrorFirstName(false);
      setErrorFirstNameMessage('');
    }

    if (name !== '') {
      const saveData = async (userType: string) => {
        let fileToSave;
        if (file) {
          fileToSave = file;
        } else {
          fileToSave = new File(['example'], '', {
            type: 'text/plain',
          });
        }
        try {
          if (userType === UserType.coach) {
            setIsLoad(true);
            const response = await coachProfileApi.savePersonalInfoCoach(
              name,
              lastName,
              fileToSave
            );
            console.log('POST [/personal_info] coach successfully', response);
            setIsLoad(false);
            setSuccess(true);
          }
          if (userType === UserType.student) {
            setIsLoad(true);
            const response = await studentProfileApi.savePersonalInfoStudent(
              name,
              lastName,
              fileToSave
            );
            setIsLoad(false);
            setSuccess(true);
            console.log('POST [/personal_info] student successfully', response);
          }
        } catch (error: any) {
          setIsLoad(false);

          if (userType === UserType.coach) {
            console.log(
              `POST [/personal_info] coach error message: ${error.message}`
            );
            setSuccess(false);
            getErrorMessage(error.message, setError);
          }
          if (userType === UserType.student) {
            console.log(
              `POST [/personal_info] student error message: ${error}`
            );
            setSuccess(false);
            getErrorMessage(error.message, setError);
          }
          console.log(`POST [/personal_info] error message: ${error.message}`);
        }
      };
      saveData(userType);
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
  }, [modalIsOpen, errorMessage]);

  const closeSuccessMessage = () => {
    setModalIsOpen(!modalIsOpen);
    setSuccess(false);
    setFileName(null);
  };

  useQuery<IUserProfile, ErrorConstructor>(['userProfile'], async () => {
    const request =
      userType === UserType.student
        ? studentProfileApi.getProfile()
        : coachProfileApi.getProfile();
    const result = await request;
    if (result.first_name.length > 0) setFirstName(result.first_name);
    if (result.last_name.length > 0) setLastName(result.last_name);
    if (result.profile_picture) setProfilePicture(result.profile_picture);

    return result;
  });

  return (
    <Box className={styles.wrapperPersonalInfo}>
      <Box className={styles.titleSection}>
        <Typography variant="h4" className={styles.title}>
          Personal Info
        </Typography>
        <Typography variant="subtitle1" className={styles.subtitle}>
          Update your photo and personal details here.
        </Typography>
      </Box>
      <Box className={styles.namesSection}>
        <Box className={styles.inputBox}>
          <Input
            helperText={errorNameMessage}
            isError={isErrorName}
            name={'name'}
            label={'First name'}
            value={name}
            sx={nameInputStyles}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
          />
        </Box>
        <Box className={styles.inputBox}>
          <Input
            helperText={errorLastNameMessage}
            isError={isErrorLastName}
            name={'lastName'}
            label={'Last name'}
            value={lastName}
            sx={nameInputStyles}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            type="text"
          />
        </Box>
      </Box>
      <Box sx={{ gap: 3 }} className={styles.uploadSection}>
        <Box className={styles.avatarImg}>
          <Avatar
            src={
              previewUrl.length > 0
                ? previewUrl
                : profilePicture
                ? profilePicture
                : previewUrl
            }
            className={styles.avatar}
          />
        </Box>
        <Box className={styles.uploadInputWrapper}>
          <DragDropFile
            setPreviewUrl={setPreviewUrl}
            fileName={fileName}
            setFileName={setFileName}
            setFile={setFile}
          />
          <Box className={styles.btnSave} onClick={savePersonalInfo}>
            Save
          </Box>
        </Box>
      </Box>
      {isLoad && (
        <CustomModel isOpen={isLoad}>
          <Loader />
        </CustomModel>
      )}
      {errorMessage && !isSuccess && (
        <CustomModel
          isOpen={modalIsOpen}
          handleClick={() => setModalIsOpen(!modalIsOpen)}
        >
          <MessageBox
            message={errorMessage}
            handleClick={() => setModalIsOpen(!modalIsOpen)}
          />
        </CustomModel>
      )}
      {isSuccess && (
        <CustomModel isOpen={modalIsOpen} handleClick={closeSuccessMessage}>
          <MessageBox
            message={'Personal information saved successfully'}
            handleClick={closeSuccessMessage}
          />
        </CustomModel>
      )}
    </Box>
  );
};

export default PersonalInfo;
