import { ISession, ISessions } from '@/store/types/session/sessionTypes';
import {
  AccessTime,
  EventAvailable,
  MonetizationOn,
  Place,
  Subject,
} from '@mui/icons-material';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import * as React from 'react';

export interface ICardsSessions {
  sessions: ISessions;
  type: string;
}

const CardsSessions: React.FC<ICardsSessions> = ({ sessions, type }) => {
  const router = useRouter();

  const handleSendMessage = (item: ISession) => {
    console.log(item.coach.profile_picture);
    // router.push({
    //   pathname: `/profiles/student?page=messages&user=`,
    //   query: { uuid: item.uuid },
    // });
    router.push(`/profiles/student?page=messages&user=`);
  };

  return (
    <>
      {sessions.lessons &&
        sessions.lessons.length > 0 &&
        sessions.lessons.map((item, index) => {
          const date = new Date(item.appointment_time);
          const appointment_date = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
          const time = `${date.getHours()}:${date.getMinutes()}`;
          return (
            <Card
              key={index}
              sx={{
                maxWidth: 582,
                minHeight: 244,
                display: 'flex',
                flexWrap: 'wrap',
                borderRadius: '16px',
              }}
            >
              <CardMedia
                sx={{
                  maxWidth: 116,
                  maxHeight: 116,
                  mt: '18px',
                  ml: '18px',
                  mb: '18px',
                  opacity: type === 'past' ? 0.4 : 1,
                }}
                component="img"
                alt="green iguana"
                height="140"
                image={item.coach.profile_picture}
              />

              <Box>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ mb: '12px' }}
                  >
                    {item.lesson ? item.lesson.name : ''}
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
                            color: type === 'past' ? '#B5B5B5' : '#1976d2',
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
                            color: type === 'past' ? '#B5B5B5' : '#1976d2',
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
                            color: type === 'past' ? '#B5B5B5' : '#1976d2',
                            mr: '3px',
                          }}
                        />
                        <Typography>
                          {item.lesson ? item.lesson.price / 100 : ''}&#163;
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
                            color: type === 'past' ? '#B5B5B5' : '#1976d2',
                            mr: '3px',
                          }}
                        />
                        <Typography>
                          {item.lesson ? item.lesson.location.name : ''}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          mr: '7px',
                          mb: '12px',
                        }}
                      >
                        <Subject
                          sx={{
                            color: type === 'past' ? '#B5B5B5' : '#1976d2',
                            mr: '3px',
                          }}
                        />
                        <Typography>
                          {item.lesson ? item.lesson.notes : ''}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
                <CardActions
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  <Box
                    sx={{
                      borderRight: { xs: 'none', sm: '.5px solid #DBDBDB' },
                      pr: { xs: 'none', sm: '8px' },
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Button
                      size="small"
                      sx={{
                        color: '#000',
                        fontWeight: '600',
                      }}
                      onClick={() => handleSendMessage(item)}
                    >
                      Message
                    </Button>
                  </Box>

                  <Box
                    sx={{
                      borderRight: { xs: 'none', sm: '.5px solid #DBDBDB' },
                      pr: { xs: 'none', sm: '8px' },
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Button
                      size="small"
                      sx={{
                        color: '#000',
                        fontWeight: '600',
                      }}
                    >
                      Book new lesson
                    </Button>
                  </Box>

                  <Box
                    sx={{
                      pl: { xs: 'none', sm: '8px' },
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Button
                      size="small"
                      sx={{ color: '#000', fontWeight: '600' }}
                    >
                      Cancel lesson
                    </Button>
                  </Box>
                </CardActions>
              </Box>
            </Card>
          );
        })}
    </>
  );
};

export default CardsSessions;
