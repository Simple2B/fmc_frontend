import { LessonService } from '@/services';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import Box from '@mui/material/Box';
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

export interface ILessonRequestsCalendar {}

const LessonRequestsCalendar: React.FC<ILessonRequestsCalendar> = () => {
  const [value, setValue] = React.useState('myCalendar');

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
                label="Lesson Requests"
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
          <MyCalendar />
        )}
      </Box>
    </Box>
  );
};

export default LessonRequestsCalendar;
