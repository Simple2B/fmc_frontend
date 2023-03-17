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
import * as React from 'react';

interface ISession {
  picture: string;
  title: string;
  date: string;
  time: string;
  price: string;
  location: string;
  clothes: string;
}

export interface ICardsSessions {
  sessions: ISession[];
  type: string;
}

const CardsSessions: React.FC<ICardsSessions> = ({ sessions, type }) => {
  // const router = useRouter();

  return (
    <>
      {sessions.map((item, index) => {
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
              image={item.picture}
            />

            <Box>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ mb: '12px' }}
                >
                  {item.title}
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
                      <Typography>{item.date}</Typography>
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
                      <Typography>{item.time}</Typography>
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
                      <Typography>{item.price}</Typography>
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
                      <Typography>{item.location}</Typography>
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
                      <Typography>{item.clothes}</Typography>
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