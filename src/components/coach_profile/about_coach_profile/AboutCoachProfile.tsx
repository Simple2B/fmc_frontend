import { Box, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import * as React from 'react';
import About from './_About';
import Schedule from './_Schedule';

export interface IAboutCoachProfile {}

const AboutCoachProfile: React.FC<IAboutCoachProfile> = () => {
  const router = useRouter();
  const matches950 = useMediaQuery('(max-width:950px)');
  const coachUuid = router.query.uuid_coach;
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
      <About coachUuid={coachUuid} />
      <Schedule coachUuid={coachUuid} />
    </Box>
  );
};

export default AboutCoachProfile;
