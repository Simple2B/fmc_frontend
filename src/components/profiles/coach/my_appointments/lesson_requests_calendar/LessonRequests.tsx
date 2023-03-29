import {
  AccessTime,
  EventAvailable,
  MonetizationOn,
  Place,
} from '@mui/icons-material';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';

export interface ILessonRequests {}

const LessonRequests: React.FC<ILessonRequests> = () => {
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
          //   flexWrap: 'wrap',
          borderRadius: '16px',
        }}
      >
        <CardMedia
          sx={{
            maxWidth: 104,
            maxHeight: 104,
            mt: '18px',
            ml: '18px',
            mb: '18px',
            // opacity: type === 'past' ? 0.4 : 1,
          }}
          component="img"
          alt="profile picture"
          height="151"
          image={''}
        />

        <Box>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ mb: '12px' }}
            >
              lesson.name
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
                  <Typography>date</Typography>
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
                  <Typography>appointment_time</Typography>
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
                  <Typography>lesson.price</Typography>
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
                  <Typography>location.name</Typography>
                </Box>
                {/* <Box
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
                      color: '#1976d2',
                      mr: '3px',
                    }}
                  />
                  <Typography>lesson.notes</Typography>
                </Box> */}
              </Box>
            </Box>
          </CardContent>
          {/* <CardActions
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
              <Button size="small" sx={{ color: '#000', fontWeight: '600' }}>
                Cancel lesson
              </Button>
            </Box>
          </CardActions> */}
        </Box>
      </Card>
    </Box>
  );
};

export default LessonRequests;
