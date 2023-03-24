import { Rating, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import styles from './Reviews.module.sass';

const reviewsData = [
  {
    title: 'Natali Natali',
    rating: 5,
    text: `Collins has a knack. He can teach through his writings. He inspires confidence in his students, and by reading. Watch the Ball, you'll be inspired too.`,
    date: 'Two days ago',
  },

  {
    title: 'Natali Natali',
    rating: 4,
    text: `Collins has a knack. He can teach through his writings. He inspires confidence in his students, and by reading. Watch the Ball, you'll be inspired too.`,
    date: 'Two days ago',
  },
];

export interface IReviews {}

const Reviews: React.FC<IReviews> = () => {
  // const router = useRouter();

  return (
    <Box className={styles.wrapper} flex={1} p={2}>
      <Typography className={styles.title}>Your Reviews</Typography>
      <Box className={styles.wrapperCards}>
        {reviewsData.map((review, index) => (
          <Box className={styles.card} key={index}>
            <Box className={styles.cardTitle}>{review.title}</Box>
            <Box className={styles.cardRating}>
              <Rating name="disabled" value={review.rating} disabled />
            </Box>
            <Box className={styles.cardText}>{review.text}</Box>
            <Box className={styles.cardDate}>{review.date}</Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Reviews;
