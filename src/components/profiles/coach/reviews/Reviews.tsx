import Box from '@mui/material/Box';
import * as React from 'react';
import styles from './Messages.module.sass';

export interface IReviews {}

const Reviews: React.FC<IReviews> = () => {
  // const router = useRouter();

  return <Box className={styles.wrapper}>Reviews</Box>;
};

export default Reviews;
