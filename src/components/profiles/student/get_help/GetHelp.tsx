import Input from '@/common/input/Input';
import Loader from '@/common/loader/Loader';
import MessageBox from '@/common/message_box/MessageBox';
import CustomModel from '@/common/modal/Modal';
import QuestionsCards from '@/components/landing_page/main_section/questions_cards/QuestionsCards';
import TitleBox from '@/components/landing_page/title_box/TitleBox';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useEffect, useState } from 'react';
import styles from './GetHelp.module.sass';

export interface IGetHelp {}

const typeQuestions = [
  {
    question: 'How much does it cost to use FindMyCoach?',
    answer:
      'At this current stage, there is no subscription fee for FindMyCoach! There is a very small charge for bookings (3.9% + 20p) which includes the Stripe payments fee and covers the cost of the Stripe Express accounts which you will have access to. We will have subscription tiers as we include some of our exciting new features but don’t worry - we will always have the option to keep using our platform for no subscription cost.dd',
    isOpen: false,
    isShowArrow: false,
  },
  {
    question: 'What are the benefits to me as a coach?',
    answer:
      'FindMyCoach allows your clients to rate and review you, so that you can show off your quality as a sports coach to future business. As we grow, we will push athletes to the site, so building up good ratings and reviews could help you gain new clients in the future. Our booking and payments system (powered by Stripe) will give you access to your own Stripe Express account which will give you a highly detailed overview of the income your coaching business is generating, as well as giving you access to first class analytics and many other features. We want to become an all-in-one hub for you to run, maintain and organise your business to help you grow quickly and efficiently. We have many exciting features that we can’t wait to share with you - these are just around the corner and will be a welcome addition to the benefits that you already receive!',
    isOpen: false,
    isShowArrow: false,
  },
  {
    question: 'What are the benefits to me as an athlete?',
    answer:
      'For athletes using FindMyCoach, our platform will give you access to your own account from which you can book with and rate your coach. Our built in calendar and booking system will make it easy for you manage your upcoming and past sessions to stay on top of your game and control your routine. By rating and reviewing the sessions you have you are helping to keep coaches accountable, which has a dramatic affect on the quality of coaching across the UK. We have some big updates planned to make your experience with 1-2-1 and group coaching much more immersive. Stay tuned!',
    isOpen: false,
    isShowArrow: false,
  },
  {
    question: 'How can I give feedback on the website?',
    answer:
      'You can give feedback using the feedback form at the bottom of the landing page. Alternatively you can email info@findmycoach.co.uk. We built this platform to help make the coaching experience better for both coaches and athletes. Whilst we’re a relatively new company, we want to hear your thoughts so we can tailor this website to the people who actually use it. If you have suggestions about something that would make the site better for you please send it in asap!',
    isOpen: false,
    isShowArrow: false,
  },
  {
    question: 'Is there a FindMyCoach app?',
    answer:
      'Unfortunately not! Having said that, the platform is functional on both laptop and mobile so you can still use us on the go. We do plan to launch a fully featured app in the future.',
    isOpen: false,
    isShowArrow: false,
  },
  {
    question: 'What sports does FindMyCoach support?',
    answer:
      'Our mission is to improve the sporting environment in the UK no matter what you coach and play! If you are a coach and your sport isn’t listed, then send us an email at info@findmycoach.co.uk with the subject ‘Adding Sport’ and let us know what it is you would like us to bring in.',
    isOpen: false,
    isShowArrow: false,
  },
];

const GetHelp: React.FC<IGetHelp> = () => {
  // const router = useRouter();

  const [question, setQuestion] = useState('');
  const [errorQuestion, setErrorQuestion] = useState<string>('');
  const [isErrorQuestion, setIsErrorQuestion] = useState<boolean>(false);

  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);

  const sendQuestion = () => {
    const email = '';
    console.log('[GetHelp (student)] question => ', {
      email: email,
      question: question,
    });
    setSuccess(false);
    setIsLoad(true);
    setIsErrorQuestion(false);
    setErrorQuestion('');
    if (question === '') {
      setIsLoad(false);
      setIsErrorQuestion(true);
      setErrorQuestion('Email cannot be empty');
    }
    setQuestion('');
    setIsLoad(false);
  };

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(true);

  useEffect(() => {
    if (!modalIsOpen) {
      setTimeout(() => {
        setModalIsOpen(true);
        setErrorQuestion('');
        setIsErrorQuestion(false);
        setIsLoad(false);
      }, 1000);
    }
  }, [modalIsOpen]);

  return (
    <Box className={styles.wrapper}>
      <Box sx={{ mb: '33px' }}>
        <TitleBox
          color={'#000'}
          top={''}
          title={'General FAQs'}
          description={'Everything you have to know about the platform.'}
          textAlign={'left'}
          paddingLeft={'24px'}
        />
      </Box>
      <QuestionsCards typeQuestions={typeQuestions} width={'100%'} />
      <Box sx={{ maxWidth: '392px', paddingLeft: '24px', mt: '67px' }}>
        <Box className={styles.title}>Still have questions?</Box>
        <Box className={styles.description}>
          Fill the form below and we’ll contact you shortly
        </Box>
        <Input
          helperText={errorQuestion}
          isError={isErrorQuestion}
          name={'question'}
          label={'Your question'}
          value={question}
          sx={{ mt: 2 }}
          onChange={(e) => {
            setQuestion(e.target.value);
            if (e.target.value !== '') {
              setIsErrorQuestion(false);
              setErrorQuestion('');
            } else {
              setIsErrorQuestion(true);
              setErrorQuestion('Question cannot be empty');
            }
          }}
          type="email"
        />
        <Button
          className={styles.Btn}
          fullWidth
          variant="contained"
          sx={{
            mt: '26px',
            mb: '26px',
            backgroundColor: '#1876D1',
            borderRadius: '8px',
            textTransform: 'capitalize',
            fontSize: '',
            width: '100%',
            height: '52px',
            textAlign: 'center',
          }}
          onClick={sendQuestion}
        >
          Send
        </Button>
      </Box>
      {isLoad && (
        <CustomModel isOpen={isLoad}>
          <Loader />
        </CustomModel>
      )}
      {errorQuestion && !isSuccess && (
        <CustomModel
          isOpen={modalIsOpen}
          handleClick={() => setModalIsOpen(!modalIsOpen)}
        >
          <MessageBox
            error={errorQuestion}
            handleClick={() => setModalIsOpen(!modalIsOpen)}
          />
        </CustomModel>
      )}
    </Box>
  );
};

export default GetHelp;
