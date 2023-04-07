import WelcomeBox from '@/common/welcom_box/WelcomeBox';
import { IUserProfile } from '@/store/types/user';
import { CalendarMonth } from '@mui/icons-material';
import { Typography, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';

import Calendar from '@/common/calendar/Calendar';
import { LessonService } from '@/services';
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
  profile: IUserProfile;
}

const MyLessons: React.FC<IMyLessons> = ({ profile }) => {
  // const router = useRouter();
  const matches970 = useMediaQuery('(max-width:970px)');
  // const [upcomingSessions, setUpcomingSessions] = useState<ISessions | null>(
  //   null
  // );

  const { data } = useQuery({
    queryKey: 'studentSessions',
    queryFn: LessonService.apiGetLessonsForStudent,
    placeholderData: [],
  });

  // React.useEffect(() => {
  //   const getUpcomingSessions = async () => {
  //     const result = await LessonService.apiGetLessonsForStudent();
  //     return result.map((lesson) =>
  //       new Date(lesson.appointment_time).getTime()
  //     );
  //   };
  //   getUpcomingSessions();
  // }, []);

  // const pastSessions: ISessions = {
  //   lessons: [
  //     {
  //       uuid: 'itjv-fifje-rjfj21-3uhfsas',
  //       lesson: {
  //         date: 'Aug 16, 2021',
  //         name: '',
  //         location: {
  //           name: 'DeWitt Clinton Park, W 54th St, New York, NY',
  //           city: 'New York',
  //           street: 'Wall Street',
  //           postal_code: '123',
  //         },

  //         sport: {
  //           name: 'Tennis',
  //         },
  //         price: 999,
  //         notes: 'Bring a tennis racket and wear tennis shoes.',
  //       },
  //       appointment_time: '12-03-2222',

  //       date: 'Aug 16, 2021',
  //       coach: {
  //         uuid: 'abc-def-ghj',
  //         username: 'johndoe',
  //         email: 'johndoe@gmail.com',
  //         first_name: 'john',
  //         last_name: 'doe',
  //         profile_picture:
  //           'https://find-my-coach-eu.s3.eu-west-2.amazonaws.com/assets/test_coach_avatar.png',
  //         is_verified: true,
  //         about: 'Dummy coach',
  //         total_rate: 5,
  //       },
  //     },
  //   ],
  // };

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
            {data && data.length > 0 ? (
              <CardsSessions lessons={data} type={'upcoming'} />
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
            <CardsSessions lessons={data ?? []} type={'past'} />
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
