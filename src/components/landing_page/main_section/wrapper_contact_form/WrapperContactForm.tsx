import { userApi } from '@/fast_api_backend/api/usersInstance/userInstance';
import { getErrorMessage } from '@/helper/error_function';
import { Box, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import Input from '../../../../common/input/Input';
import Loader from '../../../../common/loader/Loader';
import MessageBox from '../../../../common/message_box/MessageBox';
import CustomModel from '../../../../common/modal/Modal';
import styles from './WrapperContactForm.module.sass';

export interface IWrapperContactForm {}

const WrapperContactForm: React.FC<IWrapperContactForm> = () => {
  // const router = useRouter();
  const [email, setEmail] = useState('');
  const [errorEmailMessage, setErrorEmailMessage] = useState<string>('');
  const [isErrorEmail, setIsErrorEmail] = useState<boolean>(false);

  const [question, setQuestion] = useState('');

  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendQuestion = async () => {
    console.log(' question => ', {
      email: email,
      question: question,
    });
    setSuccess(false);
    setIsLoad(true);
    setIsErrorEmail(false);
    setErrorEmailMessage('');
    if (email === '') {
      setIsLoad(false);
      setIsErrorEmail(true);
      setErrorEmailMessage('Email cannot be empty');
    }
    if (question === '') {
      setIsLoad(false);
      setError('Question cannot be empty');
    }
    if (email !== '' && question !== '') {
      const data = {
        email_from: email,
        message: question,
      };
      try {
        setIsLoad(true);
        const response = await userApi.question(data);
        console.log(
          `POST landing page [/personal_info] successfully`,
          response
        );
        setIsLoad(false);
        setSuccess(true);
      } catch (error: any) {
        setIsLoad(false);
        setSuccess(false);
        getErrorMessage(error.message, setError, 'getHelp');
      }
    }
    setEmail('');
    setQuestion('');
    setIsLoad(false);
  };

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(true);

  useEffect(() => {
    if (!modalIsOpen) {
      setTimeout(() => {
        setModalIsOpen(true);
        setError(null);
        setIsLoad(false);
      }, 1000);
    }
  }, [modalIsOpen, error]);

  const closeSuccessMessage = () => {
    setModalIsOpen(!modalIsOpen);
    setSuccess(false);
  };

  return (
    <Box className={styles.wrapperCards}>
      <Box
        className={`${styles.wrapperCard} ${styles.wrapperCard1}`}
        sx={{
          height: '550px',
          backgroundImage: 'url(../../../../pexels-shvets-production.png)',
        }}
      />
      <Box id="contact_us" />
      <Box
        className={`${styles.wrapperCard} ${styles.wrapperCard2} ${styles.wrapperText}`}
      >
        <Box className={styles.title}>Still have questions?</Box>
        <Box className={styles.description}>
          Fill the form below and we’ll contact you shortly
        </Box>
        <Box className={styles.infoCards}>
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
          <Box sx={{ width: '100%', mt: '20px' }}>
            <TextField
              sx={{ width: '100%' }}
              id="outlined-multiline-static"
              label="Your question"
              multiline
              rows={4}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </Box>
        </Box>
        <Box className={styles.Btns}>
          <Button
            className={styles.Btn}
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#EB5757',
              borderRadius: '8px',
              textTransform: 'capitalize',
              fontSize: '',
              width: '187px',
              height: '52px',
              textAlign: 'center',
            }}
            onClick={sendQuestion}
          >
            Send
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
      {isSuccess && (
        <CustomModel isOpen={modalIsOpen} handleClick={closeSuccessMessage}>
          <MessageBox
            message={'Send question successfully'}
            handleClick={closeSuccessMessage}
          />
        </CustomModel>
      )}
    </Box>
  );
};

export default WrapperContactForm;
