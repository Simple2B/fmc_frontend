import Loader from '@/common/loader/Loader';
import CustomModel from '@/common/modal/Modal';
import { LikeService, ProfilesService } from '@/services';
import { UserType } from '@/store/types/user';
import { Box, Typography, useMediaQuery } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { CoachCard } from './CoachCard';

export interface CoachCardListProps {
  isLogIn: boolean;
  userType: string;
  name: string;
  sportsIdes: number[];
  address: string;
}

const CARDS_PER_PAGE = 9;

const CoachCardList: React.FC<CoachCardListProps> = ({
  isLogIn,
  userType,
  name,
  sportsIdes,
  address,
}) => {
  const matches897 = useMediaQuery('(max-width:897px)');

  const [isLoadMore, setIsLoadMore] = useState(false);

  const [next, setNext] = useState(CARDS_PER_PAGE);

  const handleMoreCards = () => {
    setIsLoadMore(true);
    setTimeout(() => {
      setNext(next + CARDS_PER_PAGE);
      setIsLoadMore(false);
    }, 1000);
  };

  const { isLoading, data } = useQuery(
    ['coachesProfilesCards', name, sportsIdes, address],
    async () => {
      const result = await ProfilesService.apiGetCoachCards(
        name,
        sportsIdes,
        address
      );

      return result.coaches;
    }
  );

  const likesCoachesQuery = useQuery(
    ['likesCoachesQuery'],
    async () => {
      const result = await LikeService.apiListLikedCoached();
      return result.coaches.map((item) => item.uuid);
    },
    { enabled: isLogIn && userType === UserType.student }
  );

  return (
    <>
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
          mb: '15px',
        }}
        gap={1.5}
      >
        {data &&
          data.slice(0, next).map((item) => {
            return (
              <CoachCard
                key={item.uuid}
                item={item}
                isLogIn={isLogIn}
                userType={UserType.student}
                liked={
                  !!likesCoachesQuery.data &&
                  likesCoachesQuery.data.includes(item.uuid)
                }
              />
            );
          })}
      </Box>
      {data && next < data?.length && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            pt: '75px',
            pb: '88px',
          }}
          onClick={handleMoreCards}
        >
          <Box
            sx={{
              width: '320px',
              maxWidth: '98%',
              backgroundColor: '#1664C0',
              height: '65px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              transition: '.3s ease all',
              borderRadius: '15px',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#222CDF',
                transition: '.3s ease all',
              },
            }}
          >
            <Typography
              sx={{
                color: '#FFFFFF',

                fontFamily: 'Inter',
                fontSize: '24px',
                fontWeight: '400',
              }}
            >
              Load more coaches
            </Typography>
          </Box>
        </Box>
      )}
      {isLoadMore && (
        <CustomModel isOpen={isLoadMore}>
          <Loader />
        </CustomModel>
      )}
      {isLoading && (
        <CustomModel isOpen={isLoading}>
          <Loader />
        </CustomModel>
      )}
    </>
  );
};

export { CoachCardList };
