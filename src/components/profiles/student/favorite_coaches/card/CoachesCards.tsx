import { IYourProfile } from '@/store/types/users/coach/profileType';
import { Star } from '@mui/icons-material';
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

export interface ICoaches {
  sessions: IYourProfile[];
}

const CoachesCards: React.FC<ICoaches> = ({ sessions }) => {
  const router = useRouter();
  const viewProfile = (uuid: string) => {
    router.push(`/coach_search/${uuid}`);
  };

  return (
    <>
      {sessions.map((item, index) => {
        return (
          <Card
            key={index}
            sx={{
              maxWidth: '424px',
              minHeight: '299px',
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              borderRadius: '16px',
              p: '20px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                borderBottom: '.5px solid #DBDBDB',
                pb: '21px',
              }}
            >
              <CardMedia
                sx={{
                  maxWidth: 63,
                  maxHeight: 63,
                }}
                component="img"
                alt="green iguana"
                height="140"
                image={item.profile_picture}
              />
              <Box sx={{ ml: '21px' }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{
                    mb: '4px',
                    fontFamily: 'Inter, sense-serif',
                    fontSize: '16px',
                    fontWeight: 600,
                  }}
                >
                  {item.first_name} {item.last_name}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{
                    mb: '4px',
                    fontFamily: 'Inter, sense-serif',
                    fontSize: '15px',
                    fontWeight: 400,
                    color: '#9E9E9E',
                  }}
                >
                  {item.sports.length > 0
                    ? item.sports
                        .map((sport) => {
                          return sport.name;
                        })
                        .join(', ')
                    : ''}{' '}
                  coach
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      mr: '3px',
                    }}
                  >
                    <Star
                      sx={{ color: '#FFC470', width: '16px', height: '16px' }}
                    />
                  </Box>
                  <Box
                    sx={{
                      fontFamily: 'Inter, sense-serif',
                      fontSize: '14px',
                      fontWeight: 600,
                    }}
                  >
                    {item.total_rate}
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box>
              <CardContent>
                <Box sx={{}}>
                  <Typography
                    sx={{
                      fontFamily: 'Inter, sense-serif',
                      fontSize: '12px',
                      fontWeight: 500,
                      color: '#9E9E9E',
                    }}
                  >
                    ABOUT
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'Work Sans, sense-serif',
                      fontSize: '18px',
                      fontWeight: 400,
                      color: '#394454',
                    }}
                  >
                    {item.about}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
              >
                <Button
                  size="small"
                  sx={{
                    color: '#fff',
                    fontFamily: 'Inter, sense-serif',
                    fontSize: '14px',
                    fontWeight: 500,
                    p: '8px 20px',
                    bgcolor: '#1876D1',
                    borderRadius: '10px',
                    '&:hover': {
                      bgcolor: '#222CDF',
                    },
                  }}
                  onClick={() => viewProfile(item.uuid)}
                >
                  View profile
                </Button>
              </CardActions>
            </Box>
          </Card>
        );
      })}
    </>
  );
};

export default CoachesCards;
