import Loader from '@/common/loader/Loader';
import CustomModel from '@/common/modal/Modal';
import { coachClientApi } from '@/fast_api_backend/api/usersInstance/coach/coachInstance';
import { StripeService } from '@/services';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

// eslint-disable-next-line no-unused-vars
interface IStripeConnectNotBoardedProps {}

function _StripeConnectNotBoarded() {
  const [enabledCreateBtn, setEnabledCreateBtn] = useState(false);
  const [enabledOnBoardBtn, setEnabledOnBoardBtn] = useState(false);
  const [stripeAccountID, setStripeAccountID] = useState<string | null>(null);

  const [isLoad, setIsLoad] = useState(false);

  // eslint-disable-next-line no-empty-pattern
  const coachStripeConnectQuery = useQuery(
    ['coachStripeConnect'],
    async () => {
      setIsLoad(true);
      const res = await StripeService.apiCoachStripeOauth();
      return res;
    },
    {
      enabled: enabledCreateBtn,
      onSuccess: () => {
        setIsLoad(false);
      },
      onError: () => {
        setIsLoad(false);
      },
    }
  );
  // eslint-disable-next-line no-empty-pattern
  const coachStripeAccountOnBoardQuery = useQuery(
    ['coachStripeAccountOnBoard'],
    async () => {
      setIsLoad(true);
      const res = await StripeService.apiCoachStripeOnboard();
      return res;
    },
    {
      enabled: enabledOnBoardBtn,
      onSuccess: (resp) => {
        setIsLoad(false);
        window.location.href = resp;
      },
      onError: () => {
        setIsLoad(false);
      },
    }
  );

  const handleCreateStripeAccount = () => {
    coachStripeConnectQuery.refetch();
    setEnabledCreateBtn(true);
  };

  const handleCompleteStripeOnBoard = () => {
    coachStripeAccountOnBoardQuery.refetch();
    setEnabledOnBoardBtn(true);
  };

  useEffect(() => {
    const getStripeAccountID = async () => {
      try {
        const coachProfile = await coachClientApi.coachGetProfile();
        console.log('[getStripeAccountID] coachProfile', coachProfile);
        setStripeAccountID(coachProfile.stripe_account_id);
      } catch (error: any) {
        console.log(
          `[GET] stripe account id -> error message => ${error.response.status}`
        );
      }
    };
    getStripeAccountID();
  }, [isLoad]);

  return (
    <>
      {' '}
      {!stripeAccountID ? (
        <>
          <Box
            sx={{
              m: '5px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                fontFamily: 'Inter, sens-serif',
                fontSize: '16px',
                fontWeight: 700,
                color: '#000000',
                pb: '5px',
                mr: '10px',
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
                mr: '10px',
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
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              fontFamily: 'Inter, sens-serif',
              fontSize: '16px',
              fontWeight: 700,
              color: '#000000',
              p: '5px',
              mr: '10px',
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
      {isLoad && (
        <CustomModel isOpen={isLoad}>
          <Loader />
        </CustomModel>
      )}
    </>
  );
}

export default _StripeConnectNotBoarded;
