import Box from '@mui/material/Box';
import * as React from 'react';
import styles from './FavoriteCoaches.module.sass';
import CoachesCards from './card/CoachesCards';

export interface IFavoriteCoaches {}

const FavoriteCoaches: React.FC<IFavoriteCoaches> = () => {
  // const router = useRouter();
  const sessions = [
    {
      name: 'John Johnson',
      picture: '../../../../../example/example_picture_avatar.png',
      type: 'Tennis coach',
      rate: '5.0',
      about: 'Tennis coach with experience training over 25,000 students',
    },
    {
      name: 'John Johnson',
      picture: '../../../../../example/example_picture_avatar.png',
      type: 'Tennis coach',
      rate: '5.0',
      about: 'Tennis coach with experience training over 25,000 students',
    },
    {
      name: 'John Johnson',
      picture: '../../../../../example/example_picture_avatar.png',
      type: 'Tennis coach',
      rate: '5.0',
      about: 'Tennis coach with experience training over 25,000 students',
    },
  ];

  return (
    <Box
      className={styles.wrapper}
      sx={{
        height: '90vh',
        overflow: 'hidden',
        overflowY: 'scroll',
      }}
      gap={2}
    >
      <Box
        sx={{
          fontFamily: 'Inter, sens-serif',
          fontWeight: 600,
          fontSize: '24px',
          color: '#000',
          mt: '23px',
          mb: '35px',
        }}
      >
        Coaches you’ve liked
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <CoachesCards sessions={sessions} />
      </Box>
    </Box>
  );
};

export default FavoriteCoaches;
