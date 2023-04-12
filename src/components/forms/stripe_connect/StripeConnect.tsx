import Box from '@mui/material/Box';
import Image from 'next/image';

import * as React from 'react';
import stripeLogo from '../../../../public/stripe_logo.png';

export interface IStripeConnect {}

const StripeConnect: React.FC<IStripeConnect> = () => {
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
      >
        Connect with Stripe
      </Box>
    </Box>
  );
};

export default StripeConnect;
