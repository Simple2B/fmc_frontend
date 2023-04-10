import { Box, useMediaQuery } from '@mui/material';
import * as React from 'react';
import About from './_About';
import Schedule from './_Schedule';

export interface IAboutCoachProfile {
  coachUuid: string | string[] | undefined;
}

const AboutCoachProfile: React.FC<IAboutCoachProfile> = ({ coachUuid }) => {
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
      <About coachUuid={coachUuid} />
      <Schedule coachUuid={coachUuid} />
    </Box>
  );
};

export default AboutCoachProfile;
