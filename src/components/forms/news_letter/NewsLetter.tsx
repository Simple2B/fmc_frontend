/* eslint-disable no-unused-vars */
import Input from '@/common/input/Input';
import CustomModel from '@/common/modal/Modal';
import { Close } from '@mui/icons-material';
import { Box } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import picture from '../../../../public/picture_newsletter.png';
import styles from './NewsLetter.module.sass';

const nameInputStyles = {
  '& .MuiInputBase-root': {
    position: 'relative',
  },
  // '&. .css-11dl6sg-MuiFormControl-root-MuiTextField-root': {
  //   borderBottomRightRadius: 'none',
  //   borderTopRightRadius: 'none',
  // },
  '& .MuiFormHelperText-root': {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: '-20px',
  },
};

interface INewsLetter {
  closeModalNewsletter: () => void;
}

export const NewsLetter: React.FC<INewsLetter> = ({ closeModalNewsletter }) => {
  // const [isLoad, setIsLoad] = useState<boolean>(false);
  // const [isSuccess, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(true);

  const [email, setEmail] = useState<string>('');
  const [errorEmailMessage, setErrorEmailMessage] = useState<string>('');
  const [isErrorEmail, setIsErrorEmail] = useState<boolean>(false);

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

  useEffect(() => {
    if (!modalIsOpen) {
      setTimeout(() => {
        setModalIsOpen(true);
        setError(null);
        // setIsLoad(false);
      }, 1000);
    }
  }, [modalIsOpen, error]);

  const subscribeNews = () => {
    closeModalNewsletter();
    // TODO: add if user subscribe
    // localStorage.setItem('subscribe', 'true');
  };

  return (
    <CustomModel
      isOpen={modalIsOpen}
      handleClick={() => {
        setModalIsOpen(!modalIsOpen);
        closeModalNewsletter();
      }}
    >
      <Box className={styles.modalMessageWrapper}>
        <Box
          className={styles.crossWrapper}
          onClick={() => {
            setModalIsOpen(!modalIsOpen);
            closeModalNewsletter();
          }}
        >
          <Close sx={{ width: '18px', height: '18px' }} />
        </Box>
        <Box className={styles.imageWrapper}>
          <Image src={picture} alt={'news letter'} className={styles.image} />
        </Box>
        <Box className={styles.modalTextWrapper}>
          <Box className={styles.title}>Sign up for updates on our launch!</Box>
          <Box className={styles.subtitle}>
            Sign up for our newsletter now and stay in the loop on all things
            FindMyCoach.
          </Box>
          <Box className={styles.inputsWrapper}>
            <Input
              helperText={errorEmailMessage}
              isError={isErrorEmail}
              name={'email'}
              label={'Email address'}
              value={email}
              sx={nameInputStyles}
              // TODO: remove error
              onChange={(e) =>
                handleOnChange(
                  e,
                  setEmail,
                  setIsErrorEmail,
                  setErrorEmailMessage
                )
              }
              type="text"
            />
            <Box className={styles.btnSave} onClick={subscribeNews}>
              Subscribe
            </Box>
          </Box>
        </Box>
      </Box>
    </CustomModel>
  );
};
