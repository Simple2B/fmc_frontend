import { Box } from '@mui/material';
import * as React from 'react';

const stylesBtn = {
  width: '80px',
  height: '40px',
  boxShadow: '0px 0px 4px rgba(117, 117, 117, 0.25)',
  borderRadius: '8px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: '400',
  fontSize: '14px',
  color: '#777777',
  cursor: 'pointer',
  fontFamily: 'Inter',
  '&:hover': {
    boxShadow: '0px 0px 4px #1876D1',
    borderRadius: '8px',
  },
};

export interface IBtns {}

const Btns: React.FC<IBtns> = () => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
        gap={0.5}
      >
        <Box sx={stylesBtn}>Football</Box>
        <Box sx={stylesBtn}>Golf</Box>
        <Box sx={stylesBtn}>Tennis</Box>
      </Box>
    </Box>
  );
};

export default Btns;