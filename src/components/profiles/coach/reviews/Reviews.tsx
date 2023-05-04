import { ReviewsService } from '@/services';
import { Rating, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useQuery } from 'react-query';
import styles from './Reviews.module.sass';

export interface IReviews {
  title?: string;
}

const Reviews: React.FC<IReviews> = ({ title }) => {
  const { data } = useQuery(['currentcoachReviews'], async () => {
    const result = await ReviewsService.apiCoachReviewsList();
    return result.reviews;
  });
  return (
    <Box className={styles.wrapper} flex={1} p={2}>
      <Typography className={styles.title}>{title}</Typography>
      <Box className={styles.wrapperCards}>
        {data
          ? data.map((review, index) => {
              const date = new Date(review.created_at);
              const created_at = `${date.getUTCDate()}/${
                date.getUTCMonth() + 1
              }/${date.getUTCFullYear()}`;
              return (
                <Box className={styles.card} key={index}>
                  {/* <Box className={styles.cardTitle}>{review.text}</Box> */}

                  <Box className={styles.cardRating}>
                    <Rating name="disabled" value={review.rate} disabled />
                  </Box>
                  <Box className={styles.cardText}>{review.text}</Box>
                  <Box className={styles.cardDate}>{created_at}</Box>
                </Box>
              );
            })
          : ''}
      </Box>
    </Box>
  );
};

export default Reviews;
