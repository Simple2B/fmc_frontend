import { Box } from '@mui/material';
import { useState } from 'react';
import styles from './QuestionsCards.module.sass';

const typeQuestions = [
  {
    question: 'How much does it cost to use FindMyCoach?',
    answer:
      'At this current stage, there is no subscription fee for FindMyCoach! There is a very small charge for bookings (3.9% + 20p) which includes the Stripe payments fee and covers the cost of the Stripe Express accounts which you will have access to. We will have subscription tiers as we include some of our exciting new features but don’t worry - we will always have the option to keep using our platform for no subscription cost.dd',
    isOpen: true,
    isShowArrow: true,
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

export interface IQuestionsCards {}

const QuestionsCards: React.FC<IQuestionsCards> = () => {
  const [questions, setQuestions] = useState(typeQuestions);

  return (
    <Box className={styles.wrapperQuestionsCards}>
      {questions.map((item, index) => {
        return (
          <Box key={index} className={styles.wrapperQuestionCard}>
            <Box className={styles.questionWrapper}>
              <Box className={styles.questionBox}>
                <Box className={styles.question}>{item.question}</Box>
                <Box
                  sx={{ display: item.isOpen ? 'none' : 'block' }}
                  className={styles.arrow}
                  onClick={() =>
                    setQuestions(
                      questions.map((item, ind) => {
                        if (ind === index) {
                          return {
                            question: item.question,
                            answer: item.answer,
                            isOpen: true,
                            isShowArrow: true,
                          };
                        } else {
                          return item;
                        }
                      })
                    )
                  }
                >
                  &#x2198;
                </Box>
              </Box>
              <Box
                className={styles.answerBox}
                sx={{
                  visibility: item.isShowArrow ? 'visible' : 'hidden',
                  height: !item.isShowArrow ? '0px' : '100%',
                  marginTop: !item.isShowArrow ? '0px' : '20px',
                }}
              >
                <Box className={styles.answer}>{item.answer}</Box>
                <Box
                  className={styles.arrow}
                  onClick={() =>
                    setQuestions(
                      questions.map((item, ind) => {
                        if (ind === index) {
                          return {
                            question: item.question,
                            answer: item.answer,
                            isOpen: false,
                            isShowArrow: false,
                          };
                        } else {
                          return item;
                        }
                      })
                    )
                  }
                >
                  &#x2197;
                </Box>
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default QuestionsCards;
