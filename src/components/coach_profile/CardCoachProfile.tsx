import { ProfilesService } from '@/services/services/ProfilesService';
import {
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useQuery } from 'react-query';
import star from '../../../public/star.png';

export interface ICardCoachProfile {}

const CardCoachProfile: React.FC<ICardCoachProfile> = () => {
  const matches650 = useMediaQuery('(max-width:650px)');
  const router = useRouter();
  const coachUuid = router.query.uuid_coach;

  const profileCoachDataQuery = useQuery(
    ['coachProfile', coachUuid],
    async () => {
      if (typeof coachUuid === 'string') {
        const result = await ProfilesService.apiGetCoachByUuid(coachUuid);
        return result;
      }
    }
  );

  return (
    <Box
      sx={{
        width: '100%',
        p: matches650 ? '4px' : '0 24px',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <Card
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          boxShadow: '0px 0px 13px -2px rgba(75, 75, 75, 0.25)',
          p: '40px 40px 32px',
          borderRadius: '8px',
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            flexDirection: matches650 ? 'column' : 'row',
          }}
        >
          <Box sx={{ mr: matches650 ? '0px' : '43px' }}>
            {profileCoachDataQuery.data &&
            profileCoachDataQuery.data.profile_picture ? (
              <Image
                src={profileCoachDataQuery.data.profile_picture}
                alt={'picture'}
                width={200}
                height={200}
              />
            ) : (
              ''
            )}
          </Box>
          <Box>
            <Typography
              sx={{
                fontFamily: 'Poppins',
                fontSize: '40px',
                fontWeight: '500',
                color: '#000000',
              }}
            >
              {profileCoachDataQuery.data?.first_name
                ? profileCoachDataQuery.data?.first_name +
                  ' ' +
                  profileCoachDataQuery.data?.last_name
                : profileCoachDataQuery.data?.username}
            </Typography>
            <hr
              style={{
                width: '100%',
                border: '1px solid #222CDF',
                marginBottom: '32px',
              }}
            />
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontSize: '18px',
                fontWeight: '600',
                color: '#394454',
                mb: '10px',
              }}
            >
              {'Offers' +
                ' ' +
                profileCoachDataQuery.data?.sports
                  .map((sport) => sport.name)
                  .join(', ') +
                ' ' +
                'Lessons'}
            </Typography>
            {/* <Typography
              sx={{
                fontFamily: 'Inter',
                fontSize: '18px',
                fontWeight: '400',
                color: '#394454',
                mb: '10px',
              }}
            >
              {profileCoachDataQuery.data?.sports
                .map((sport) => sport.name)
                .join(', ') +
                ' coach with experience training over 25,000 students'}
            </Typography> */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
              gap={1}
            >
              {profileCoachDataQuery.data?.total_rate ? (
                <Box>
                  <Image src={star} alt={'star'} />
                </Box>
              ) : null}

              <Typography variant="body2" color="text.secondary">
                {profileCoachDataQuery.data?.total_rate
                  ? profileCoachDataQuery.data?.total_rate +
                    ' ' +
                    (profileCoachDataQuery.data?.reviews.length + ' Reviews')
                  : ''}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CardCoachProfile;
