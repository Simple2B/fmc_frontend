import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
} from '@mui/material';
import * as React from 'react';

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
  },
];

export interface ICoachCards {}

const CoachCards: React.FC<ICoachCards> = () => {
  return (
    <Box
      sx={{
        maxWidth: '1140px',
        width: '100%',
        p: '0 24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        mt: '45px',
      }}
      gap={1}
    >
      {testDataCoachesProfiles.map((item, index) => {
        return (
          <Card key={index}>
            <Box sx={{ width: 379, height: 354 }}>
              <CardMedia
                component="img"
                alt="picture"
                height="100%"
                image={'../../../test_picture_coach_profile.png'}
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
                gap={1}
              >
                <Box>{item.first_name}</Box>
                <Box>{item.last_name}</Box>
              </Box>
            </Box>
            <CardContent
              sx={{
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
                  disabled
                  // onChange={(event, newValue) => {
                  //   setValue(newValue);
                  // }}
                />
              </Box>
              <Box>{item.about}</Box>
            </CardContent>
            <CardActions>
              <Button size="small">View profile</Button>
            </CardActions>
          </Card>
        );
      })}
    </Box>
  );
};

export default CoachCards;
