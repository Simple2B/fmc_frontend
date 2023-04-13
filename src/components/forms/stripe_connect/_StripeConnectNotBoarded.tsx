import { StripeService } from '@/services';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useQuery } from 'react-query';
interface IStripeConnectNotBoardedProps {
  stripeAccountID: string | null;
}

function _StripeConnectNotBoarded({
  stripeAccountID,
}: IStripeConnectNotBoardedProps) {
  const [enabledCreateBtn, setEnabledCreateBtn] = useState(false);
  const [enabledOnBoardBtn, setEnabledOnBoardBtn] = useState(false);

  // eslint-disable-next-line no-empty-pattern
  const {} = useQuery(
    ['coachStripeConnect'],
    async () => {
      const res = await StripeService.apiCoachStripeOauth();
      return res;
    },
    {
      enabled: enabledCreateBtn,
    }
  );
  // eslint-disable-next-line no-empty-pattern
  const {} = useQuery(
    ['coachStripeAccountOnBoard'],
    async () => {
      const res = await StripeService.apiCoachStripeOnboard();
      return res;
    },
    {
      enabled: enabledOnBoardBtn,
      onSuccess: (resp) => {
        window.location.href = resp;
      },
    }
  );

  const handleCreateStripeAccount = () => {
    setEnabledCreateBtn(true);
  };

  const handleCompleteStripeOnBoard = () => {
    setEnabledOnBoardBtn(true);
  };

  return (
    <div>
      {' '}
      {!stripeAccountID ? (
        <>
          <Box
            sx={{
              m: '5px',
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <Box
              sx={{
                fontFamily: 'Inter, sens-serif',
                fontSize: '16px',
                fontWeight: 700,
                color: '#000000',
                pb: '8px',
              }}
            >
              Connect with Stripe
            </Box>
            <Box
              sx={{
                fontFamily: 'Inter, sens-serif',
                fontSize: '12px',
                fontWeight: 400,
                color: '#777777',
              }}
            >
              Use your Stripe account to accept debit and credit cards.
            </Box>
          </Box>
          <Box
            sx={{
              m: '5px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '279px',
              height: '44px',
              backgroundColor: '#1876D1',
              color: '#ffffff',
              borderRadius: '8px',
              transition: 'all 0.5s ease-out',
              '&:hover': {
                backgroundColor: '#222CDF',
                color: '#ffffff',
                transition: 'all 0.5s ease-out',
              },
            }}
            onClick={handleCreateStripeAccount}
          >
            Connect with Stripe
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Box
            sx={{
              fontFamily: 'Inter, sens-serif',
              fontSize: '16px',
              fontWeight: 700,
              color: '#000000',
              pb: '8px',
            }}
          >
            You are already connected to STRIPE EXPRESS
          </Box>

          <Box
            sx={{
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '279px',
              height: '44px',
              backgroundColor: '#625afa',
              color: '#ffffff',
              borderRadius: '8px',
              transition: 'all 0.5s ease-out',
              '&:hover': {
                backgroundColor: '#7c75f9',
                color: '#ffffff',
                transition: 'all 0.5s ease-out',
              },
            }}
            onClick={handleCompleteStripeOnBoard}
          >
            Complete onboarding
            <ReportGmailerrorredIcon
              sx={{ color: '#b3093c' }}
            ></ReportGmailerrorredIcon>
          </Box>
        </Box>
      )}
    </div>
  );
}

export default _StripeConnectNotBoarded;
