import { Box, Card, CardActions, CardContent, Typography } from '@mui/material';
import Image from 'next/image';
import * as React from 'react';
import arrow from '../../../public/arrow.png';
import styles from './CardSubscription.module.sass';

export interface ICardSubscription {}

const orders = [
  {
    title: 'In order for your profileh',
  },
  {
    title: 'In order for your profileh',
  },
  {
    title: 'In order for your profileh',
  },
  {
    title: 'In order for your profileh',
  },
];

const CardSubscription: React.FC<ICardSubscription> = () => {
  // const router = useRouter();

  return (
    <Card className={styles.card}>
      <CardContent className={styles.cardContent}>
        <Box className={styles.wrapperTitle}>
          <Typography className={styles.title}>$20</Typography>
          <Typography className={styles.subtitle}>per month</Typography>
        </Box>
        <Box className={styles.wrapperLists}>
          <Typography className={styles.title}>You will get:</Typography>
          {orders.map((order, index) => {
            return (
              <Box key={index} className={styles.subtitleWrapper}>
                <Box className={styles.circle}>
                  <Image
                    className={styles.image}
                    src={arrow}
                    alt={'arrow'}
                    width={8}
                    height={8}
                  />
                </Box>
                <Box className={styles.subtitle}>{order.title}</Box>
              </Box>
            );
          })}
        </Box>
      </CardContent>
      <CardActions
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box className={styles.btn}>Get started</Box>
      </CardActions>
    </Card>
  );
};

export default CardSubscription;
