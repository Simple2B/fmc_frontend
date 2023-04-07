import { ReviewsService } from '@/services/services/ReviewsService';
import { Rating, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useQuery } from 'react-query';
import styles from './Reviews.module.sass';

export interface IReviewList {
  title?: string;
}

const Reviews: React.FC<IReviewList> = ({ title }) => {
  // const router = useRouter();
  // Your Reviews
  const { data } = useQuery(['coachReviews'], async () => {
    const res = await ReviewsService.apiCoachReviewsList();
    console.log('Reviews ------->', res);
    return res;
  });

  return (
    <Box className={styles.wrapper} flex={1} p={2}>
      <Typography className={styles.title}>{title}</Typography>
      <Box className={styles.wrapperCards}>
        {data?.reviews.map((review, index) => {
          const date = new Date(review.created_at);
          const review_date = `${date.getUTCDate()}/${
            date.getUTCMonth() + 1
          }/${date.getUTCFullYear()}`;

          return (
            <Box className={styles.card} key={index}>
              {/* <Box className={styles.cardTitle}>{review.text}</Box> */}
              <Box className={styles.cardRating}>
                <Rating name="disabled" value={review.rate} disabled />
              </Box>
              <Box className={styles.cardText}>{review.text}</Box>
              <Box className={styles.cardDate}>{review_date}</Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Reviews;
