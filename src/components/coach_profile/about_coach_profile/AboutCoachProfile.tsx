import { PaymentCheckState } from '@/store/types/users/coach/profileType';
import { Box, useMediaQuery } from '@mui/material';
import * as React from 'react';
import About from './_About';
import Schedule from './schedule_column/Schedule';

export interface IAboutCoachProfile {
  isLogIn: boolean | null;
  userType: string | null;
  isPaymentCheck: PaymentCheckState;
  setIsPaymentCheck: React.Dispatch<React.SetStateAction<PaymentCheckState>>;
}

const AboutCoachProfile: React.FC<IAboutCoachProfile> = ({
  isLogIn,
  userType,
  isPaymentCheck,
  setIsPaymentCheck,
}) => {
  const matches950 = useMediaQuery('(max-width:950px)');
  return (
    <Box
      sx={{
        width: '100%',
        p: '0 26px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: matches950 ? 'column' : 'row',
        flexWrap: 'wrap',
        mt: '39px',
      }}
      gap={matches950 ? 3 : 13}
    >
      <About isPaymentCheck={isPaymentCheck} />
      <Schedule
        maxWidth={610}
        isLogIn={isLogIn}
        userType={userType}
        isPaymentCheck={isPaymentCheck}
        setIsPaymentCheck={setIsPaymentCheck}
      />
    </Box>
  );
};

export default AboutCoachProfile;
