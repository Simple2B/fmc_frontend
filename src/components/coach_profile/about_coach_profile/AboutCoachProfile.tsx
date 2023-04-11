import { Box, useMediaQuery } from '@mui/material';
import * as React from 'react';
import About from './_About';
import Schedule from './schedule_column/Schedule';

export interface IAboutCoachProfile {}

const AboutCoachProfile: React.FC<IAboutCoachProfile> = () => {
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
      <About />
      <Schedule maxWidth={610} />
    </Box>
  );
};

export default AboutCoachProfile;
