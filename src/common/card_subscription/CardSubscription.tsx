import { coachSubscriptionApi } from '@/fast_api_backend/api/authApi/coach/subscription';
import { Box, Card, CardActions, CardContent, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  const getSession = async () => {
    try {
      const result = await coachSubscriptionApi.getCheckoutSession();
      console.log('--------------> url session sub', result.url);
      if (result.url && result.url.length > 0) {
        window.location.href = result.url;
      }
      return result.url;
    } catch (error) {
      router.push('/profiles/coach?my_appointments');
      console.log('[CardSubscription] error => ', error);
    }
  };

  return (
    <Card className={styles.card}>
      <CardContent className={styles.cardContent}>
        <Box className={styles.wrapperTitle}>
          <Typography className={styles.title}>19,99 £</Typography>
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
        <Box className={styles.btn} onClick={() => getSession()}>
          Get started
        </Box>
      </CardActions>
    </Card>
  );
};

export default CardSubscription;
