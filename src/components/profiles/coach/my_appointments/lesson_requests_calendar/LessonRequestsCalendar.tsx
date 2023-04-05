import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
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
  // const router = useRouter();

  const [value, setValue] = React.useState('myCalendar');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

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
                  color: value === 'lessonRequests' ? '#333333' : '#BBB5B5',
                  position: 'relative',
                }}
                value="lessonRequests"
                control={
                  <Radio
                    sx={{
                      color: value === 'lessonRequests' ? '#333333' : '#BBB5B5',
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
                  color: value === 'myCalendar' ? '#333333' : '#BBB5B5',
                  position: 'relative',
                }}
                value="myCalendar"
                control={
                  <Radio
                    sx={{
                      color: value === 'myCalendar' ? '#333333' : '#BBB5B5',
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
      </Box>
      <Box className={styles.sectionsWrapper}>
        <Box className={styles.sectionsTitle}>
          Respond to pending lesson requests • 1 new
        </Box>
        {value === 'lessonRequests' ? <LessonRequests /> : <MyCalendar />}
      </Box>
    </Box>
  );
};

export default LessonRequestsCalendar;
