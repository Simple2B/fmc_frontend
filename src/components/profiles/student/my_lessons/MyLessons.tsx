import WelcomeBox from '@/common/welcom_box/WelcomeBox';
import { CalendarMonth } from '@mui/icons-material';
import { Typography, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';

import Calendar from '@/common/calendar/Calendar';
import { CalendarContext } from '@/context/calendarContext';
import { LessonService, User } from '@/services';
import { useContext, useMemo } from 'react';
import { useQuery } from 'react-query';
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

export interface IMyLessons {
  profile: User;
}

const MyLessons: React.FC<IMyLessons> = ({ profile }) => {
  const matches970 = useMediaQuery('(max-width:970px)');
  const { calendarState } = useContext(CalendarContext);

  const { data } = useQuery({
    queryKey: 'studentSessions',
    queryFn: LessonService.apiGetLessonsForStudent,
    placeholderData: [],
  });

  const { upcoming, past } = useMemo(() => {
    const currentMoment = new Date();
    const todaysLessons =
      data
        ?.filter(
          (lesson) =>
            new Date(lesson.appointment_time).setHours(0, 0, 0, 0) ===
            calendarState.selectedDate.setHours(0, 0, 0, 0)
        )
        .sort(
          (a, b) =>
            new Date(b.appointment_time).getTime() -
            new Date(a.appointment_time).getTime()
        ) ?? [];
    return {
      upcoming: todaysLessons.filter(
        (lesson) => new Date(lesson.appointment_time) > currentMoment
      ),
      past: todaysLessons.filter(
        (lesson) => new Date(lesson.appointment_time) < currentMoment
      ),
    };
  }, [data, calendarState.selectedDate]);

  return (
    <Box
      className={styles.wrapper}
      flex={1}
      p={2}
      sx={{
        height: '90vh',
        overflow: 'hidden',
        overflowY: 'scroll',
      }}
    >
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
            {upcoming.length > 0 ? (
              <CardsSessions lessons={upcoming} type={'upcoming'} />
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
            <CardsSessions lessons={past} type={'past'} />
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
            <Calendar />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MyLessons;
