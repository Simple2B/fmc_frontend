import { Favorite, FavoriteBorder } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Rating,
  Typography,
  useMediaQuery,
} from '@mui/material';
import * as React from 'react';
import { useState } from 'react';

const testDataCoachesProfiles = [
  {
    uuid: '1',
    picture_url: '../../../test_picture_coach_profile.png',
    rate: 4,
    first_name: 'John',
    last_name: 'Doe',
    username: '',
    address: '1234 Main St',
    about: 'kenaa@example.com',
    isLike: false,
  },
  {
    uuid: '2',
    picture_url: '../../../test_picture_coach_profile.png',
    rate: 4,
    first_name: 'John',
    last_name: 'Doe',
    username: '',
    address: '1234 Main St',
    about: 'kenaa@example.com',
    isLike: false,
  },
  {
    uuid: '3',
    picture_url: '../../../test_picture_coach_profile.png',
    rate: 4,
    first_name: 'John',
    last_name: 'Doe',
    username: '',
    address: '1234 Main St',
    about: 'kenaa@example.com',
    isLike: false,
  },
  {
    uuid: '4',
    picture_url: '../../../test_picture_coach_profile.png',
    rate: 4,
    first_name: 'John',
    last_name: 'Doe',
    username: '',
    address: '1234 Main St',
    about: 'kenaa@example.com',
    isLike: false,
  },
];

export interface ICoachCards {}

const CoachCards: React.FC<ICoachCards> = () => {
  const matches1136 = useMediaQuery('(max-width:1136px)');
  const matches1061 = useMediaQuery('(max-width:1061px)');
  const matches986 = useMediaQuery('(max-width:986px)');

  const matches897 = useMediaQuery('(max-width:897px)');

  const [dataCoachesProfiles, setDataCoachesProfiles] = useState<
    {
      uuid: string;
      picture_url: string;
      rate: number;
      first_name: string;
      last_name: string;
      username: string;
      address: string;
      about: string;
      isLike: boolean;
    }[]
  >(testDataCoachesProfiles);

  const toggleLike = (uuid: string) => {
    console.log('====================================');
    console.log(' click -> ' + uuid);
    console.log('====================================');
    setDataCoachesProfiles(
      dataCoachesProfiles.map((item) => {
        if (item.uuid === uuid) {
          return {
            ...item,
            isLike: !item.isLike,
          };
        }
        return item;
      })
    );
  };

  return (
    <Box
      sx={{
        maxWidth: '1140px',
        width: '100%',
        p: '0 24px',
        display: 'flex',
        justifyContent: matches897 ? 'center' : 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        mt: '45px',
      }}
      gap={1.5}
    >
      {dataCoachesProfiles.map((item, index) => {
        return (
          <Card
            key={index}
            sx={{
              maxWidth: matches986
                ? 275
                : matches1061
                ? 305
                : matches1136
                ? 330
                : 355,
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                maxHeight: matches1061 ? 300 : matches1136 ? 325 : 350,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: '100%',
                  height: '74px',
                  backgroundColor: 'rgba(255, 255, 255, 0.78)',
                  zIndex: 0,
                },
              }}
            >
              <CardMedia
                component="img"
                alt="picture"
                height="100%"
                image={'../../../test_picture_coach_profile.png'}
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  flexDirection: 'column',
                  width: '100%',
                  height: '74px',
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 1,
                }}
                gap={1}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    ml: '16px',
                  }}
                  gap={1}
                >
                  <Typography
                    sx={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#777777',
                    }}
                  >
                    {item.first_name}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#777777',
                    }}
                  >
                    {item.last_name}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    ml: '16px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    fontWeight: '400',
                    color: '#777777',
                  }}
                >
                  {item.address}
                </Typography>
              </Box>
              <IconButton
                onClick={() => toggleLike(item.uuid)}
                aria-label="add to favorites"
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                }}
              >
                {item.isLike ? (
                  <Favorite sx={{ width: 40, height: 34, color: '#F05547' }} />
                ) : (
                  <FavoriteBorder
                    sx={{ width: 40, height: 34, color: '#fff' }}
                  />
                )}
              </IconButton>
            </Box>
            <CardContent
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                flexDirection: 'column',
              }}
            >
              <Box>
                <Rating
                  name="simple-controlled"
                  value={item.rate}
                  color={'#FFA629'}
                  readOnly
                  // onChange={(event, newValue) => {
                  //   setValue(newValue);
                  // }}
                />
              </Box>
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: '400',
                  color: '#777777',
                }}
              >
                Lorem Ipsum is dummy text and you what evr see thats proven
                1500.Lorem Ipsum is dummy text and you what evr see thats proven
                1500.
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              <Button
                sx={{
                  width: '180px',
                  height: '44px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white',
                  backgroundColor: '#F05547',
                  borderRadius: '15px',
                  '&:hover': {
                    backgroundColor: '#1664C0',
                  },
                }}
              >
                View profile
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </Box>
  );
};

export default CoachCards;
