import { StripeService } from '@/services';
import Box from '@mui/material/Box';
import Image from 'next/image';
import * as React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import stripeLogo from '../../../../public/stripe_logo.png';
import _StripeConnectBoarded from './_StripeConnectBoarded';
import _StripeConnectNotBoarded from './_StripeConnectNotBoarded';

export interface IStripeConnect {
  stripeAccountID: string | null;
}

const StripeConnect: React.FC<IStripeConnect> = ({ stripeAccountID }) => {
  const [coachIsBoarded, setCoachIsBoarded] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const { data } = useQuery(
    ['checkCoachStripeAccountOnBoard'],
    async () => {
      const res = await StripeService.apiCheckCoachStripeOnboard();
      console.log('IS BOARDED ?', res);
      setCoachIsBoarded(res);
      return res;
    },
    {
      refetchInterval: 10000,
    }
  );

  return (
    <Box
      sx={{
        pl: '16px',
        pr: '16px',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Box
        sx={{
          m: '5px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '60px',
          height: '60px',
          backgroundColor: '#005A92',
          borderRadius: '4px',
        }}
      >
        <Image
          src={stripeLogo}
          alt={'logo'}
          width={45}
          height={45}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </Box>

      {coachIsBoarded ? (
        <_StripeConnectBoarded />
      ) : (
        <_StripeConnectNotBoarded stripeAccountID={stripeAccountID} />
      )}
    </Box>
  );
};

export default StripeConnect;
