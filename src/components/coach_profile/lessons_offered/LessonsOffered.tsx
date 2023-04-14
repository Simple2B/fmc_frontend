import { PackagesService } from '@/services/services/PackagesService';
import { PaymentCheckState } from '@/store/types/users/coach/profileType';
import { BorderColor } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import LessonsOfferedCards from './lessons_offere_card/LessonsOfferedCard';
import PriceCard from './lessons_offere_card/PriceCard';

// const testDataOneToOne = {
//   title: '1-on-1 Tennis Lessons',
//   description:
//     'Tincidunt commodo eu curabitur interdum lacinia ullamcorper purus. Eleifend eget accumsan in donec maecenas tempor. ',
//   itemsDescription: [
//     '60 minutes of tennis training',
//     'Tennis equipment provided',
//     'Tennis equipment provided',
//     '60 minutes of tennis training',
//     '60 minutes of tennis training',
//     'Tennis equipment provided',
//     'Tennis equipment provided',
//   ],
//   location: [
//     {
//       name: 'Reagal Tennis Club',
//       address: '64 Deer Ridge Dr., Santa Cruz, CA 10001 (map)',
//     },
//     {
//       name: 'Green Tennis Club',
//       address: '64 Alder St., Santa Cruz, CA 10001',
//     },
//   ],
// };

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
  const router = useRouter();
  // info for the package one to one
  const [locations, setLocations] = useState<
    {
      name: string;
      address: string;
    }[]
  >([]);
  const [name, setName] = useState<string>('');
  const [additionalInformationTitle, setAdditionalInformationTitle] =
    useState<string>('');
  const [
    additionalInformationDescription,
    setAdditionalInformationDescription,
  ] = useState<string>('');

  useQuery(['packagesQuery'], async () => {
    const result = await PackagesService.apiGetPackages();

    console.log('[LessonsOffered =>>> packagesQuery] result === ', result);
    if (result.lessons.length > 0) {
      const lessonNumber = result.lessons.length - 1;
      setName(result.lessons[lessonNumber].title ?? '');
      setAdditionalInformationTitle(
        result.lessons[lessonNumber].additional_information_title ?? ''
      );
      setAdditionalInformationDescription(
        result.lessons[lessonNumber].additional_information_description ?? ''
      );
      if (result.lessons[lessonNumber].coach.locations.length > 0) {
        const coachLocations = result.lessons[lessonNumber].coach.locations.map(
          (location) => {
            return {
              name: ` ${location.city}, ${location.street}, ${location.postal_code}`,
              address: '',
            };
          }
        );
        setLocations(coachLocations);
      }
    }
    return result;
  });
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
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          // fontFamily: 'Poppins, sans-serif',
          // fontSize: '24px',
          // fontWeight: '500',
          // color: '#394454',
        }}
      >
        {' '}
        <Typography
          sx={{
            alignSelf: 'center',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '24px',
            fontWeight: '500',
            color: '#394454',
          }}
        >
          {' '}
          LessonsOffered
        </Typography>
        <BorderColor
          onClick={() => router.push('/profiles/coach?packages')}
          sx={{
            ml: '15px',
            mb: '7px',
            alignSelf: 'center',
            color: 'rgba(0, 0, 0, 0.3)',
            cursor: 'pointer',
            '&:hover': {
              color: '#394454',
            },
          }}
        />
      </Box>
      <LessonsOfferedCards
        title={`1-on-1 Tennis Lesson (${name})`}
        description={additionalInformationTitle}
        itemsDescription={[additionalInformationDescription]}
        location={locations}
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
      />
    </Box>
  );
};

export default LessonsOffered;
