/* eslint-disable no-unused-vars */
import Input from '@/common/input/Input';
import Loader from '@/common/loader/Loader';
import MessageBox from '@/common/message_box/MessageBox';
import CustomModel from '@/common/modal/Modal';
import { newsApi } from '@/fast_api_backend/api/usersInstance/newsInstance';
import { getErrorMessage } from '@/helper/error_function';
import { Close, DoneAll } from '@mui/icons-material';
import { Box } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import picture from '../../../../public/picture_newsletter.png';
import styles from './NewsLetter.module.sass';

const re = /\S+@\S+\.\S+/;

const nameInputStyles = {
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

interface INewsLetter {
  show: boolean;
  closeModalNewsletter: () => void;
}

export const NewsLetter: React.FC<INewsLetter> = ({
  show,
  closeModalNewsletter,
}) => {
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
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
        setIsLoad(false);
      }, 1000);
    }
  }, [modalIsOpen, error]);

  const [modalIsOpenSuccess, setModalIsOpenSuccess] = useState<boolean>(true);
  const [modalIsOpenError, setModalIsOpenError] = useState<boolean>(false);

  useEffect(() => {
    if (!modalIsOpen) {
      setTimeout(() => {
        setModalIsOpenSuccess(true);
        setError(null);
        setIsLoad(false);
      }, 1000);
    }
  }, [modalIsOpen, error]);

  const subscribeNews = () => {
    if (email === '') {
      setIsErrorEmail(true);
      setErrorEmailMessage('Email cannot be empty');
    } else {
      setIsErrorEmail(false);
      setErrorEmailMessage('');
    }
    if (re.test(email.toLowerCase())) {
      setIsErrorEmail(false);
      setErrorEmailMessage('');
    } else {
      setIsErrorEmail(true);
      setErrorEmailMessage('Email is not valid');
    }

    if (email !== '') {
      const data = {
        email: email,
      };
      const sendData = async () => {
        try {
          setIsLoad(true);
          const response = await newsApi.subscribeNews(data);
          console.log('[POST] subscribe newsletter successfully', response);
          setIsLoad(false);
          setSuccess(true);
          closeModalNewsletter();
          localStorage.setItem('subscribe', 'true');
        } catch (error: any) {
          setIsLoad(false);
          console.log(
            `[POST] subscribe newsletter  error message: ${error.message}`
          );
          setSuccess(false);
          getErrorMessage(error.message, setError);
        }
      };
      sendData();
    }
  };

  const closeSuccessMessage = () => {
    setModalIsOpenSuccess(!modalIsOpenSuccess);
    setSuccess(false);
    setEmail('');
  };

  useEffect(() => {
    setTimeout(() => {
      if (isSuccess) {
        setSuccess(false);
      }
    }, 3000);
  }, [isSuccess]);

  return (
    <>
      <CustomModel isOpen={show}>
        <Box className={styles.modalMessageWrapper}>
          <Box
            className={styles.crossWrapper}
            onClick={() => {
              closeModalNewsletter();
            }}
          >
            <Close sx={{ width: '18px', height: '18px' }} />
          </Box>
          <Box className={styles.imageWrapper}>
            <Image src={picture} alt={'news letter'} className={styles.image} />
          </Box>
          <Box className={styles.modalTextWrapper}>
            <Box className={styles.title}>
              Sign up for updates on our launch!
            </Box>
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

      {isLoad && (
        <CustomModel isOpen={isLoad}>
          <Loader />
        </CustomModel>
      )}
      {error && !isSuccess && (
        <CustomModel isOpen={modalIsOpenError}>
          <MessageBox
            message={error}
            handleClick={() => setModalIsOpenError(!modalIsOpenError)}
          />
        </CustomModel>
      )}

      {isSuccess && (
        <CustomModel
          isOpen={modalIsOpenSuccess}
          handleClick={closeSuccessMessage}
        >
          <Box className={styles.modalMessageWrapper}>
            <Box
              className={styles.crossWrapper}
              onClick={() => {
                setModalIsOpenSuccess(!modalIsOpen);
              }}
            >
              <Close sx={{ width: '18px', height: '18px' }} />
            </Box>
            <Box className={styles.imageWrapper}>
              <Image
                src={picture}
                alt={'news letter'}
                className={styles.image}
              />
            </Box>
            <Box className={styles.modalTextSuccessWrapper}>
              <DoneAll sx={{ color: 'green' }} />
              <Box className={styles.title}>Thank you for subscribing!</Box>
            </Box>
          </Box>
        </CustomModel>
      )}
    </>
  );
};
