import { PaymentCheckState } from '@/store/types/users/coach/profileType';
import { Box } from '@mui/material';
import * as React from 'react';
import LessonsOfferedCards from './lessons_offere_card/LessonsOfferedCard';
import PriceCard from './lessons_offere_card/PriceCard';

const testDataOneToOne = {
  title: '1-on-1 Tennis Lessons',
  description:
    'Tincidunt commodo eu curabitur interdum lacinia ullamcorper purus. Eleifend eget accumsan in donec maecenas tempor. ',
  itemsDescription: [
    '60 minutes of tennis training',
    'Tennis equipment provided',
    'Tennis equipment provided',
    '60 minutes of tennis training',
    '60 minutes of tennis training',
    'Tennis equipment provided',
    'Tennis equipment provided',
  ],
  location: [
    {
      name: 'Reagal Tennis Club',
      address: '64 Deer Ridge Dr., Santa Cruz, CA 10001 (map)',
    },
    {
      name: 'Green Tennis Club',
      address: '64 Alder St., Santa Cruz, CA 10001',
    },
  ],
};

const testDataGroup = {
  title: 'Group Tennis Lesson',
  description:
    'Tincidunt commodo eu curabitur interdum lacinia ullamcorper purus. Eleifend eget accumsan in donec maecenas tempor. ',
  itemsDescription: [
    '60 minutes of tennis training',
    'Tennis equipment provided',
    'Tennis equipment provided',
    '60 minutes of tennis training',
    '60 minutes of tennis training',
    'Tennis equipment provided',
    'Tennis equipment provided',
  ],
  location: [
    {
      name: 'Reagal Tennis Club',
      address: '64 Deer Ridge Dr., Santa Cruz, CA 10001 (map)',
    },
    {
      name: 'Green Tennis Club',
      address: '64 Alder St., Santa Cruz, CA 10001',
    },
  ],
};

export interface ILessonsOffered {
  isLogIn: boolean | null;
  userType: string | null;
  isPaymentCheck: PaymentCheckState;
  setIsPaymentCheck: React.Dispatch<React.SetStateAction<PaymentCheckState>>;
}

const LessonsOffered: React.FC<ILessonsOffered> = ({
  isLogIn,
  userType,
  isPaymentCheck,
  setIsPaymentCheck,
}) => {
  return (
    <Box
      sx={{
        mt: '31px',
        width: '100%',
        p: '0 24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          alignSelf: 'flex-start',
          mb: '32px',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '24px',
          fontWeight: '500',
          color: '#394454',
        }}
      >
        {' '}
        LessonsOffered
      </Box>
      <LessonsOfferedCards
        title={testDataOneToOne.title}
        description={testDataOneToOne.description}
        itemsDescription={testDataOneToOne.itemsDescription}
        location={testDataOneToOne.location}
      >
        <PriceCard
          isLogIn={isLogIn}
          userType={userType}
          isPaymentCheck={isPaymentCheck}
          setIsPaymentCheck={setIsPaymentCheck}
        />
      </LessonsOfferedCards>

      <LessonsOfferedCards
        title={testDataGroup.title}
        description={testDataGroup.description}
        itemsDescription={testDataGroup.itemsDescription}
        location={testDataGroup.location}
        // children={}
      />
    </Box>
  );
};

export default LessonsOffered;
