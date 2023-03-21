/* eslint-disable no-unused-vars */
import Input from '@/common/input/Input';
import DragDropFile from '@/common/upload_drag_and_drop_input/DragDropFile';
import { Avatar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useState } from 'react';
import styles from './PersonalInfo.module.sass';

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

export interface IPersonalInfo {}

const PersonalInfo: React.FC<IPersonalInfo> = () => {
  // const router = useRouter();
  const [name, setFirstName] = React.useState<string>('');
  const [errorNameMessage, setErrorFirstNameMessage] =
    React.useState<string>('');
  const [isErrorName, setIsErrorFirstName] = React.useState<boolean>(false);

  const [lastName, setLastName] = React.useState<string>('');
  const [errorLastNameMessage, setErrorLastNameMessage] =
    React.useState<string>('');
  const [isErrorLastName, setIsErrorLastName] = React.useState<boolean>(false);

  const [file, setFile] = useState<any[] | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');

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
      setErrorNameMessage('Name cannot be empty');
    }
  };

  const savePersonalInfo = () => {};

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
            onChange={(e) =>
              handleOnChange(
                e,
                setFirstName,
                setIsErrorFirstName,
                setErrorFirstNameMessage
              )
            }
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
              handleOnChange(
                e,
                setLastName,
                setIsErrorLastName,
                setErrorLastNameMessage
              );
            }}
            type="text"
          />
        </Box>
      </Box>
      <Box sx={{ gap: 3 }} className={styles.uploadSection}>
        <Box className={styles.avatarImg}>
          <Avatar src={previewUrl} className={styles.avatar} />
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
    </Box>
  );
};

export default PersonalInfo;
