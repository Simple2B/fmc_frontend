import Loader from '@/common/loader/Loader';
import CustomModel from '@/common/modal/Modal';
import { coachProfileApi } from '@/fast_api_backend/api/usersInstance/coach/profileInstance';
import { studentClientApi } from '@/fast_api_backend/api/usersInstance/student/studentInstance';
import { UserType } from '@/store/types/user';
import { IYourProfile } from '@/store/types/users/coach/profileType';
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
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
// import { useQuery } from 'react-query';

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

export interface ICoachCards {
  isLogIn: boolean | null;
  userType: string | null;
  name: string | null;
  sportsIdes: string | string[] | undefined;
  address: string;
}

const cardsPerPage = 9;

const CoachCards: React.FC<ICoachCards> = ({
  isLogIn,
  userType,
  name,
  sportsIdes,
  address,
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const matches1136 = useMediaQuery('(max-width:1136px)');
  const matches1061 = useMediaQuery('(max-width:1061px)');
  const matches986 = useMediaQuery('(max-width:986px)');
  const matches897 = useMediaQuery('(max-width:897px)');

  const [isLoadMore, setIsLoadMore] = useState(false);

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

  const [next, setNext] = useState(cardsPerPage);

  const handleMoreCards = () => {
    setIsLoadMore(true);
    setTimeout(() => {
      setNext(next + cardsPerPage);
      setIsLoadMore(false);
    }, 1000);
  };

  const { isLoading, data } = useQuery<IYourProfile[], ErrorConstructor>(
    ['coachesProfilesCards', name, sportsIdes],
    async () => {
      const request = coachProfileApi.getCoachesCards;
      console.log('===[CoachCards] sportsIdes ', sportsIdes);
      const result = await request(
        name ? name : '',
        sportsIdes ? sportsIdes : '',
        address ? address : ''
      );
      return result;
    }
  );

  console.log('[CoachCards] data ', data);

  const likesCoachesQuery = useQuery<IYourProfile[] | null, ErrorConstructor>(
    ['likesCoachesQuery'],
    async () => {
      const result =
        isLogIn && userType === UserType.student
          ? await studentClientApi.getCoachesCardsWithLikes()
          : null;
      return result;
    }
  );

  const mutationLikeFunction = useMutation(
    async (coach_uuid: string) => {
      return await studentClientApi.studentLikeCoach(coach_uuid);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('likesCoachesQuery');
      },
    }
  );

  const mutationUnLikeFunction = useMutation(
    async (coach_uuid: string) => {
      return await studentClientApi.studentUnLikeCoach(coach_uuid);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('likesCoachesQuery');
      },
    }
  );

  const toggleLike = (uuid: string) => {
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
          data.slice(0, next).map((item, index) => {
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
                    width: matches986
                      ? 275
                      : matches1061
                      ? 305
                      : matches1136
                      ? 330
                      : 355,
                    maxHeight: matches1061 ? 300 : matches1136 ? 325 : 350,
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: 0,
                      width: matches986
                        ? 275
                        : matches1061
                        ? 305
                        : matches1136
                        ? 330
                        : 355,
                      height: '74px',
                      backgroundColor: 'rgba(255, 255, 255, 0.78)',
                      zIndex: 0,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    alt="picture"
                    width="100%"
                    height={matches1061 ? 300 : matches1136 ? 325 : 350}
                    image={item.profile_picture}
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
                      {item.locations && item.locations.length > 0
                        ? item.locations
                            .map((location) => location.city)
                            .join(', ')
                        : ''}
                    </Typography>
                  </Box>
                  {isLogIn && userType === UserType.student && (
                    <IconButton
                      onClick={() => toggleLike(item.uuid)}
                      aria-label="add to favorites"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                      }}
                    >
                      {likesCoachesQuery.data &&
                      likesCoachesQuery.data.length > 0 &&
                      likesCoachesQuery.data.filter(
                        (value) => value.uuid === item.uuid
                      ).length === 1 ? (
                        <Favorite
                          sx={{ width: 40, height: 34, color: '#F05547' }}
                          onClick={() => {
                            mutationUnLikeFunction.mutate(item.uuid);
                          }}
                        />
                      ) : (
                        <FavoriteBorder
                          sx={{
                            width: 40,
                            height: 34,
                            color: 'rgba(236, 236, 236, 1)',
                          }}
                          onClick={() => {
                            mutationLikeFunction.mutate(item.uuid);
                          }}
                        />
                      )}
                    </IconButton>
                  )}
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
                      // TODO: rate must be add in backend
                      // value={item.rate}
                      value={3}
                      color={'#FFA629'}
                      readOnly
                      // onChange={(event, newValue) => {
                      //   setValue(newValue);
                      // }}
                    />
                  </Box>
                  <Box sx={{ height: '90px', overflow: 'scroll' }}>
                    <Typography
                      sx={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '16px',
                        fontWeight: '400',
                        color: '#777777',
                      }}
                    >
                      {item.about}
                    </Typography>
                  </Box>
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
                    onClick={() => router.push(`/coach_search/${item.uuid}`)}
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

export default CoachCards;
