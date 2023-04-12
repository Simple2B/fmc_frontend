import { Box } from '@mui/material';
import { useState } from 'react';
import styles from './QuestionsCards.module.sass';

export interface IQuestionCard {
  question: string;
  answer: string;
  isOpen: boolean;
  isShowArrow: boolean;
}

export interface IQuestionsCards {
  typeQuestions: IQuestionCard[];
  width: string;
}

const QuestionsCards: React.FC<IQuestionsCards> = ({
  typeQuestions,
  width,
}) => {
  const [questions, setQuestions] = useState(typeQuestions);

  return (
    <Box className={styles.wrapperQuestionsCards} sx={{ width: width }}>
      {questions.map((item, index) => {
        return (
          <Box
            key={index}
            className={styles.wrapperQuestionCard}
            onClick={() =>
              setQuestions(
                questions.map((item, ind) => {
                  if (ind === index) {
                    return {
                      question: item.question,
                      answer: item.answer,
                      isOpen: !item.isOpen,
                      isShowArrow: !item.isShowArrow,
                    };
                  } else {
                    return item;
                  }
                })
              )
            }
          >
            <Box className={styles.questionWrapper}>
              <Box className={styles.questionBox}>
                <Box className={styles.question}>{item.question}</Box>
                <Box
                  className={styles.arrow}
                  sx={{ display: item.isOpen ? 'none' : 'block' }}
                  // onClick={() =>
                  //   setQuestions(
                  //     questions.map((item, ind) => {
                  //       if (ind === index) {
                  //         return {
                  //           question: item.question,
                  //           answer: item.answer,
                  //           isOpen: true,
                  //           isShowArrow: true,
                  //         };
                  //       } else {
                  //         return item;
                  //       }
                  //     })
                  //   )
                  // }
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
                  // onClick={() =>
                  //   setQuestions(
                  //     questions.map((item, ind) => {
                  //       if (ind === index) {
                  //         return {
                  //           question: item.question,
                  //           answer: item.answer,
                  //           isOpen: false,
                  //           isShowArrow: false,
                  //         };
                  //       } else {
                  //         return item;
                  //       }
                  //     })
                  //   )
                  // }
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
