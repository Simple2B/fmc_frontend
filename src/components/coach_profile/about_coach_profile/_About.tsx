import { ProfilesService } from '@/services/services/ProfilesService';
import { PaymentCheckState } from '@/store/types/users/coach/profileType';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useQuery } from 'react-query';

export interface IAbout {
  isPaymentCheck: PaymentCheckState;
}

const About: React.FC<IAbout> = ({ isPaymentCheck }) => {
  const router = useRouter();
  const coachUuid = router.query.uuid_coach;
  const profileCoachDataQuery = useQuery(
    ['coachProfile', isPaymentCheck, coachUuid],
    async () => {
      if (typeof coachUuid === 'string') {
        const result = await ProfilesService.apiGetCoachByUuid(coachUuid);
        return result;
      }
    }
  );
  return (
    <Box flex={1}>
      <Box
        sx={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: '24px',
          fontWeight: '500',
          color: '#394454',
          mb: '16px',
        }}
      >
        About me
      </Box>
      <Box
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '18px',
          fontWeight: '400',
          color: '#394454',
          lineHeight: '24px',
          mb: '56px',
        }}
      >
        {profileCoachDataQuery.data?.about}
      </Box>
      <Box
        sx={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: '24px',
          fontWeight: '500',
          color: '#394454',
          mb: '26px',
        }}
      >
        Credentials and Experience
      </Box>
      <Box
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '18px',
          fontWeight: '400',
          color: '#5D6D6F',
          mb: '16px',
        }}
      >
        Extensive coaching experience
      </Box>
      <Box
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '18px',
          fontWeight: '400',
          color: '#394454',
          lineHeight: '27px',
          mb: '32px',
        }}
      >
        {profileCoachDataQuery.data
          ? profileCoachDataQuery.data.experience
          : ''}
      </Box>
      <Box
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '18px',
          fontWeight: '400',
          color: '#5D6D6F',
          mb: '16px',
        }}
      >
        Industry recognition
      </Box>
      <Box
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '18px',
          fontWeight: '400',
          color: '#394454',
          lineHeight: '27px',
          mb: '32px',
        }}
      >
        {profileCoachDataQuery.data
          ? profileCoachDataQuery.data.credentials
          : ''}
      </Box>
      {/* <Box
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '18px',
          fontWeight: '400',
          color: '#5D6D6F',
          mb: '16px',
        }}
      >
        Speicalized in Forehand and backhand
      </Box>
      <Box
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '18px',
          fontWeight: '400',
          color: '#394454',
          lineHeight: '27px',
          mb: '32px',
        }}
      >
        Consectetur adipiscing elit. Neque pharetra tempor turpis ut quis risus.
      </Box> */}
    </Box>
  );
};

export default About;
