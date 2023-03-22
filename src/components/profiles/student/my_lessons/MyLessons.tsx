import RightBar from '@/common/right_bar/RightBar';
import { studentClientApi } from '@/fast_api_backend/api/usersInstance/student/studentInstance';
import { ISessions } from '@/store/types/session/sessionTypes';
import { CalendarMonth } from '@mui/icons-material';
import { Typography, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Image from 'next/image';
import * as React from 'react';
import { useState } from 'react';
import armIcon from '../../../../../public/arm_icon.png';
import styles from './MyLessons.module.sass';
import CardsSessions from './card/CardsSessions';
const boxStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 3,
};

export interface IMyLessons {}

const MyLessons: React.FC<IMyLessons> = () => {
  // const router = useRouter();
  const matches970 = useMediaQuery('(max-width:970px)');
  const [upcomingSessions, setUpcomingSessions] = useState<ISessions | null>(
    null
  );

  React.useEffect(() => {
    const getUpcomingSessions = async () => {
      const result = await studentClientApi.studentUpcomingLessons();
      console.log('-------------------------> Sessions:', result);
      setUpcomingSessions(result);
    };
    getUpcomingSessions();
  }, []);

  const pastSessions: ISessions = {
    lessons: [
      {
        name: '1 on 1 Tennis Lesson',
        location: {
          name: 'DeWitt Clinton Park, W 54th St, New York, NY',
          city: 'New York',
          street: 'Wall Street',
          postal_code: '123',
        },
        sport: {
          name: 'Tennis',
        },
        appointment_time: '12:30PM- 2:30PM',
        date: 'Aug 16, 2021',
        price: 999,
        notes: 'Bring a tennis racket and wear tennis shoes.',
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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ mr: '5px', fontSize: '32px', fontWeight: '600' }}>
              Hello Adam
            </Typography>
            <Image src={armIcon} alt={'hello'} width={25} height={25} />
          </Box>

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
