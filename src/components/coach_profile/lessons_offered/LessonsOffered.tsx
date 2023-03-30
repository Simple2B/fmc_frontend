import { Box } from '@mui/material';
import * as React from 'react';
import LessonsOfferedCards from './_LessonsOfferedCard';

export interface ILessonsOffered {}

const LessonsOffered: React.FC<ILessonsOffered> = () => {
  // const matches650 = useMediaQuery('(max-width:650px)');

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
      <LessonsOfferedCards />
    </Box>
  );
};

export default LessonsOffered;
