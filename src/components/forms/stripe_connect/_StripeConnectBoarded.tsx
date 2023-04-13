import { StripeService } from '@/services';
import { Box, Typography } from '@mui/material';
import { useQuery } from 'react-query';

const _StripeConnectBoarded = () => {
  const { refetch } = useQuery(
    ['getCoachDashboard'],
    async () => {
      const res = await StripeService.apiCoachStripeDashboard();
      return res;
    },
    {
      enabled: false,
      onSuccess: (data) => {
        window.location.href = data;
      },
    }
  );

  const handleClick = () => {
    refetch();
  };
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#625afa',
          borderRadius: 8,
          padding: '10px',
          '&:hover': {
            transition: 'ease-in-out 0.3s all',
            cursor: 'pointer',
            backgroundColor: '#7c75f9',
          },
        }}
        onClick={handleClick}
      >
        <Typography
          sx={{
            fontFamily: 'Inter',
            fontSize: '14px',
            fontWeight: '600',
            color: 'white',
          }}
        >
          View your dashboard
        </Typography>
      </Box>
    </Box>
  );
};

export default _StripeConnectBoarded;
