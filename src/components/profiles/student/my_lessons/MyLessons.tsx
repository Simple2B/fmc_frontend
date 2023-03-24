import RightBar from '@/common/right_bar/RightBar';
import WelcomeBox from '@/common/welcom_box/WelcomeBox';
import { studentClientApi } from '@/fast_api_backend/api/usersInstance/student/studentInstance';
import { ISessions } from '@/store/types/session/sessionTypes';
import { IUserProfile } from '@/store/types/user';
import { CalendarMonth } from '@mui/icons-material';
import { Typography, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useState } from 'react';

import CardsSessions from './card/CardsSessions';
import styles from './MyLessons.module.sass';

const boxStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 3,
};

export interface IMyLessons {
  profile: IUserProfile;
}

const MyLessons: React.FC<IMyLessons> = ({ profile }) => {
  // const router = useRouter();
  const matches970 = useMediaQuery('(max-width:970px)');
  const [upcomingSessions, setUpcomingSessions] = useState<ISessions | null>(
    null
  );

  React.useEffect(() => {
    const getUpcomingSessions = async () => {
      const result = await studentClientApi.studentUpcomingLessons();

      setUpcomingSessions(result);
    };
    getUpcomingSessions();
  }, []);

  const pastSessions: ISessions = {
    lessons: [
      {
        lesson: {
          date: 'Aug 16, 2021',
          name: '',
          location: {
            name: 'DeWitt Clinton Park, W 54th St, New York, NY',
            city: 'New York',
            street: 'Wall Street',
            postal_code: '123',
          },
          sport: {
            name: 'Tennis',
          },
          price: 999,
          notes: 'Bring a tennis racket and wear tennis shoes.',
        },
        appointment_time: '12-03-2222',

        date: 'Aug 16, 2021',
        coach: {
          uuid: 'abc-def-ghj',
          username: 'johndoe',
          email: 'johndoe@gmail.com',
          first_name: 'john',
          last_name: 'doe',
          profile_picture:
            'https://find-my-coach-eu.s3.eu-west-2.amazonaws.com/assets/test_coach_avatar.png',
          is_verified: true,
          about: 'Dummy coach',
        },
      },
    ],
  };

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
          <Box>
            <Typography sx={{ mr: '5px', fontSize: '14px', fontWeight: '700' }}>
              Upcoming sessions
            </Typography>
          </Box>
          <Box sx={boxStyle}>
            {upcomingSessions ? (
              <CardsSessions sessions={upcomingSessions} type={'upcoming'} />
            ) : (
              <Box>
                <Typography>No upcoming sessions</Typography>
              </Box>
            )}
          </Box>
        </Box>

        <Box sx={boxStyle} mt={'53px'}>
          <Box>
            <Typography
              sx={{
                mr: '5px',
                fontSize: '14px',
                fontWeight: '700',
                color: '#B5B5B5',
              }}
            >
              Past sessions
            </Typography>
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 3,
            }}
          >
            <CardsSessions sessions={pastSessions} type={'past'} />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: matches970 ? 0 : '410px',
          display: 'flex',
          justifyContent: 'flex-start',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 3,
        }}
      >
        <Box
          sx={{
            position: matches970 ? 'none' : 'fixed',
            display: matches970 ? 'none' : 'block',
            visibility: matches970 ? 'hidden' : 'visible',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CalendarMonth
              sx={{ width: 35, height: 35, mr: '7px', color: '#F05547' }}
            />
            <Typography sx={{ mr: '5px', fontSize: '32px', fontWeight: '600' }}>
              My Calendar
            </Typography>
          </Box>
          <Box sx={boxStyle}>
            <RightBar />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MyLessons;
