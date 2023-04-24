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
  const coachUUID =
    router.asPath.split('/')[router.asPath.split('/').length - 1];

  const { data } = useQuery(['coachPackages', coachUUID], async () => {
    const result = await PackagesService.apiGetPackagesForCoach(
      coachUUID as string
    );
    console.log('[LessonsOffered =>>> packagesQuery] result === ', result);
    const lessonNumber = result.lessons.length - 1;
    setLocations(
      result.lessons[lessonNumber].coach.locations.map((location) => {
        return {
          name: ` ${location.city}, ${location.street}, ${location.postal_code}`,
          address: '',
        };
      })
    );
    return result;
  });
  // info for the package one to one
  const [locations, setLocations] = useState<
    {
      name: string;
      address: string;
    }[]
  >([]);
  // eslint-disable-next-line no-unused-vars
  const [name, setName] = useState<string>('');
  // eslint-disable-next-line no-unused-vars
  const [additionalInformationTitle, setAdditionalInformationTitle] =
    useState<string>('');

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
        title={`1-on-1 Lesson (${data?.lessons[0].title} package)`}
        description={data?.lessons[0].additional_information_title}
        itemsDescription={[
          data?.lessons[0].additional_information_description ?? '',
        ]}
        location={locations}
      >
        <PriceCard
          price={data?.lessons[0].price}
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
