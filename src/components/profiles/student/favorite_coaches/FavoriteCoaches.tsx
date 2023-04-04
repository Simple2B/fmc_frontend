import { studentClientApi } from '@/fast_api_backend/api/usersInstance/student/studentInstance';
import { IYourProfile } from '@/store/types/users/coach/profileType';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import styles from './FavoriteCoaches.module.sass';
import CoachesCards from './card/CoachesCards';

export interface IFavoriteCoaches {}

const FavoriteCoaches: React.FC<IFavoriteCoaches> = () => {
  const [favouriteCoaches, setFavouriteCoaches] = useState<IYourProfile[]>([]);
  // const router = useRouter();
  useQuery(['coachesProfilesCards'], async () => {
    const request = studentClientApi.getCoachesCardsWithLikes;
    const result = await request();
    console.log('COACHES I LIKED ->>>>>>>>>>>>>:', result);
    setFavouriteCoaches(result);
  });
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
        <CoachesCards sessions={favouriteCoaches} />
      </Box>
    </Box>
  );
};

export default FavoriteCoaches;
