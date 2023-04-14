import { LessonService } from '@/services';
import {
  AccessTime,
  EventAvailable,
  MonetizationOn,
  Place,
} from '@mui/icons-material';
import { Avatar, Card, CardContent, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import moment from 'moment';
import * as React from 'react';
import { useQuery } from 'react-query';

export interface ILessonRequests {}

const LessonRequests: React.FC<ILessonRequests> = () => {
  const { data } = useQuery(['coachUpcomingLessons'], async () => {
    const res = await LessonService.apiGetUpcomingAppointments();
    console.log(res);
    return res;
  });

  return (
    <Box>
      <Card
        // key={index}
        sx={{
          maxWidth: 885,
          minHeight: 151,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '16px',
        }}
      >
        {data?.lessons.map((item, index) => {
          const date = new Date(item.appointment_time);
          const appointment_date = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
          const time = moment(date).format('LT');
          return (
            <Box
              key={index}
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100px',
                  height: '100px',
                  margin: 'auto 5%',
                }}
              >
                {' '}
                <Avatar
                  sx={{
                    width: '100%',
                    height: '100%',
                    flex: 1,
                  }}
                  src={item.student.profile_picture}
                  aria-label="recipe"
                />
              </Box>

              <CardContent
                sx={{
                  flex: 4,
                  alignSelf: 'flex-start',
                }}
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ mb: '12px' }}
                >
                  {item.schedule.lesson.title}
                </Typography>
                <Box sx={{ borderBottom: '.5px solid #DBDBDB' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      mt: '12px',
                      mb: '12px',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mr: '7px',
                      }}
                    >
                      <EventAvailable
                        sx={{
                          color: '#1976d2',
                          mr: '3px',
                        }}
                      />
                      <Typography>{appointment_date}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mr: '7px',
                      }}
                    >
                      <AccessTime
                        sx={{
                          color: '#1976d2',
                          mr: '3px',
                        }}
                      />
                      <Typography>{time}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mr: '7px',
                      }}
                    >
                      <MonetizationOn
                        sx={{
                          color: '#1976d2',
                          mr: '3px',
                        }}
                      />
                      <Typography>
                        {item.schedule.lesson.price / 100} &#163;
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexDirection: 'column',
                      flexWrap: 'wrap',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        mr: '7px',
                        mb: '12px',
                      }}
                    >
                      <Place
                        sx={{
                          color: '#1976d2',
                          mr: '3px',
                        }}
                      />
                      <Typography>
                        {item.schedule.lesson.location.city},{' '}
                        {item.schedule.lesson.location.street},{' '}
                        {item.schedule.lesson.location.postal_code}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Box>
          );
        })}
      </Card>
    </Box>
  );
};

export default LessonRequests;
