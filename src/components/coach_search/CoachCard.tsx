import { Coach, LikeService } from '@/services';
import { UserType } from '@/store/types/user';
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
import { useMutation, useQueryClient } from 'react-query';

interface CoachCardProps {
  item: Coach;
  isLogIn: boolean;
  userType: UserType;
  liked: boolean;
}

export const CoachCard: React.FC<CoachCardProps> = ({
  item,
  isLogIn,
  userType,
  liked,
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const matches1136 = useMediaQuery('(max-width:1136px)');
  const matches1061 = useMediaQuery('(max-width:1061px)');
  const matches986 = useMediaQuery('(max-width:986px)');

  const mutationLikeFunction = useMutation(
    async ({ coach_uuid, liked }: { coach_uuid: string; liked: boolean }) => {
      const queryFn = liked
        ? LikeService.apiUnlikeCoach
        : LikeService.apiLikeCoach;

      await queryFn(coach_uuid);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('likesCoachesQuery');
      },
    }
  );

  const handleToggleLike = () => {
    if (!item.uuid) {
      return;
    }

    mutationLikeFunction.mutate({ coach_uuid: item.uuid, liked });
  };

  const handleNavigateToCoachProfile = () =>
    router.push(`/coach_search/${item.uuid}`);

  return (
    <Card
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
          width: matches986 ? 275 : matches1061 ? 305 : matches1136 ? 330 : 355,
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
              ? item.locations.map((location) => location.city).join(', ')
              : ''}
          </Typography>
        </Box>
        {isLogIn && userType === UserType.student && (
          <IconButton
            onClick={handleToggleLike}
            aria-label="add to favorites"
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
            }}
          >
            {liked ? (
              <Favorite sx={{ width: 40, height: 34, color: '#F05547' }} />
            ) : (
              <FavoriteBorder
                sx={{
                  width: 40,
                  height: 34,
                  color: 'rgba(236, 236, 236, 1)',
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
          onClick={handleNavigateToCoachProfile}
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
};
