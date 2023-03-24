import CardSubscription from '@/common/card_subscription/CardSubscription';
import WelcomeBox from '@/common/welcom_box/WelcomeBox';
import { IUserProfile } from '@/store/types/user';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
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
  profile: IUserProfile;
}

const MyAppointments: React.FC<IMyAppointments> = ({ profile }) => {
  // const router = useRouter();

  return (
    <Box className={styles.wrapper} flex={1} p={2}>
      <Box>
        <Box sx={boxStyle}>
          <WelcomeBox
            name={
              profile.first_name.length > 0
                ? `${profile.first_name} ${profile.last_name}`
                : profile.username
            }
          />
        </Box>
        <Box className={styles.subTitle}>
          <Typography className={styles.title}>
            Ready to get started?
          </Typography>
          <Typography className={styles.subtitle}>
            In order for your profile to be seen by students you have to get the
            subscription{' '}
          </Typography>
        </Box>
        <CardSubscription />
      </Box>
    </Box>
  );
};

export default MyAppointments;
