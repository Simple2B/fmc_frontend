import RightBar from '@/common/right_bar/RightBar';
import { CalendarMonth } from '@mui/icons-material';
import { Typography, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Image from 'next/image';
import * as React from 'react';
import armIcon from '../../../../../public/arm_icon.png';
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

export interface IMyLessons {}

const MyLessons: React.FC<IMyLessons> = () => {
  // const router = useRouter();
  const matches970 = useMediaQuery('(max-width:970px)');

  const upcomingSessions = [
    {
      picture: '../../../../../example/example_picture_avatar.png',
      title: '1-on-1 Tennis Lesson with John',
      date: 'Aug 16, 2021',
      time: '12:30PM- 2:30PM',
      price: 'Price $64',
      location: 'DeWitt Clinton Park, W 54th St, New York, NY',
      clothes: 'Bring a tennis racket and wear tennis shoes.',
    },
    {
      picture: '../../../../../example/example_picture_avatar.png',
      title: '1-on-1 Tennis Lesson with John',
      date: 'Aug 16, 2021',
      time: '12:30PM- 2:30PM',
      price: 'Price $64',
      location: 'DeWitt Clinton Park, W 54th St, New York, NY',
      clothes: 'Bring a tennis racket and wear tennis shoes.',
    },
  ];

  const pastSessions = [
    {
      picture: '../../../../../example/example_picture_avatar.png',
      title: '1-on-1 Tennis Lesson with John',
      date: 'Aug 16, 2021',
      time: '12:30PM- 2:30PM',
      price: 'Price $64',
      location: 'DeWitt Clinton Park, W 54th St, New York, NY',
      clothes: 'Bring a tennis racket and wear tennis shoes.',
    },
  ];

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
            <CardsSessions sessions={upcomingSessions} type={'upcoming'} />
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
