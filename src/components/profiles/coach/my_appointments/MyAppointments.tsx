import CardSubscription from '@/common/card_subscription/CardSubscription';
import WelcomeBox from '@/common/welcom_box/WelcomeBox';
import { User } from '@/services';
import { ICoachSubscription } from '@/store/types/users/coach/profileType';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useQuery } from 'react-query';
import { StripeService } from '../../../../services/services/StripeService';
import styles from './MyAppointments.module.sass';

const boxStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 3,
};

export interface IMyAppointments {
  profile: User;
  coachSubscription?: ICoachSubscription | null;
}

const MyAppointments: React.FC<IMyAppointments> = ({
  profile,
  coachSubscription,
}) => {
  const coachCustomerPortalQuery = useQuery(
    ['coachCustomerPortal'],
    async () => {
      const res = await StripeService.apiCoachCustomerPortal();
      return res;
    },
    {
      enabled: coachSubscription ? true : false,
    }
  );
  return (
    <Box className={styles.wrapper} flex={1} p={2}>
      <Box className={styles.subWrapper}>
        <Box sx={boxStyle}>
          <WelcomeBox
            name={
              profile.first_name.length > 0
                ? `${profile.first_name} ${profile.last_name}`
                : profile.username
            }
          />
        </Box>
        {!coachSubscription && (
          <Box className={styles.subTitle}>
            <Typography className={styles.title}>
              Ready to get started?
            </Typography>
            <Typography className={styles.subtitle}>
              In order for your profile to be seen by students you have to get
              the subscription{' '}
            </Typography>
          </Box>
        )}
        {!coachSubscription && <CardSubscription />}
        {coachSubscription && (
          <Box
            className={styles.manageBtn}
            onClick={() => {
              window.location.href = coachCustomerPortalQuery.data;
            }}
          >
            Manage your subscription
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MyAppointments;
