import { LessonService } from '@/services';
import { ICoachSubscription } from '@/store/types/users/coach/profileType';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import { useQuery } from 'react-query';
import { StripeService } from '../../../../../services/services/StripeService';
import styles from '../MyAppointments.module.sass';
import LessonRequests from './LessonRequests';
import MyCalendar from './MyCalendar';
const styleBtn = {
  fontFamily: 'Inter, sens-serif',
  fontSize: '20px',
  fontWeight: 600,
};

export interface ILessonRequestsCalendar {
  coachSubscription?: ICoachSubscription | null;
}

const LessonRequestsCalendar: React.FC<ILessonRequestsCalendar> = ({
  coachSubscription,
}) => {
  const [value, setValue] = React.useState('myCalendar');
  const matches768 = useMediaQuery('(max-width:768px)');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const { data } = useQuery(
    ['coachUpcomingLessons'],
    async () => {
      const res = await LessonService.apiGetUpcomingAppointments();
      console.log('[coachUpcomingLessons] lessons => ', res.lessons);
      return res;
    },
    {
      refetchInterval: 10000,
    }
  );

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
    <Box className={styles.wrapperLessonRequestsCalendar} flex={1} p={2}>
      <Box className={styles.toggleBtns}>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <Box>
              <FormControlLabel
                sx={{
                  ...styleBtn,
                  color: value === 'lessonRequests' ? '#222CDF' : '#222CDF',
                  position: 'relative',
                }}
                value="lessonRequests"
                control={
                  <Radio
                    sx={{
                      color: value === 'lessonRequests' ? '#222CDF' : '#222CDF',
                    }}
                  />
                }
                label="Upcoming Lessons"
              />
              {value === 'lessonRequests' && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: '7px',
                    width: '126px',
                    borderBottom: '1px solid #1876D1',
                    left: '30px',
                  }}
                />
              )}
            </Box>

            <Box>
              <FormControlLabel
                sx={{
                  ...styleBtn,
                  color: value === 'myCalendar' ? '#222CDF' : '#222CDF',
                  position: 'relative',
                }}
                value="myCalendar"
                control={
                  <Radio
                    sx={{
                      color: value === 'myCalendar' ? '#222CDF' : '#222CDF',
                    }}
                  />
                }
                label="My calendar"
              />
              {value === 'myCalendar' && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: '7px',
                    width: '89px',
                    borderBottom: '1px solid #1876D1',
                    right: '15.5px',
                  }}
                />
              )}
            </Box>
          </RadioGroup>
        </FormControl>
        <Box
          className={styles.manageSubBtn}
          onClick={() => {
            window.location.href = coachCustomerPortalQuery.data;
          }}
        >
          Manage your subscription
        </Box>
      </Box>
      <Box className={styles.sectionsWrapper}>
        <Box className={styles.sectionsTitle}>
          Respond to pending lesson requests •{' '}
          {data && data.lessons.length > 0 ? `${data.lessons.length} new` : '0'}
        </Box>
        {value === 'lessonRequests' ? (
          <LessonRequests lessons={data ? data.lessons : []} />
        ) : (
          <>
            {matches768 && (
              <Box
                sx={{
                  marginBottom: '2%',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '10px',
                    fontFamily: 'Inter',
                    color: 'red',
                    textDecoration: 'underline',
                  }}
                >
                  If you are using the mobile version, then press and hold your
                  finger on the desired slot to create a schedule !
                </Typography>
              </Box>
            )}

            <MyCalendar />
          </>
        )}
      </Box>
    </Box>
  );
};

export default LessonRequestsCalendar;
