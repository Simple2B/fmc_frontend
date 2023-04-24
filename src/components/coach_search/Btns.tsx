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
  // color: '#777777',
  cursor: 'pointer',
  fontFamily: 'Inter',
  '&:hover': {
    boxShadow: '0px 0px 4px #1876D1',
    borderRadius: '8px',
  },
};

export interface IBtns {
  sportsIdes: string | string[] | undefined;
  sports: {
    id: number;
    name: string;
    isActive: boolean;
  }[];
  // eslint-disable-next-line no-unused-vars
  toggleSport: (sport: { id: number; name: string; isActive: boolean }) => void;
}

const Btns: React.FC<IBtns> = ({ sports, toggleSport }) => {
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
          flexWrap: 'wrap',
        }}
        gap={0.5}
      >
        {/* <Box sx={stylesBtn}>Football</Box>
        <Box sx={stylesBtn}>Golf</Box>
        <Box sx={stylesBtn}>Tennis</Box> */}
        {sports &&
          sports.length > 0 &&
          sports.map((sport, index) => {
            if (sport.name !== 'Swimming') {
              return (
                <Box
                  key={index}
                  sx={{
                    ...stylesBtn,
                    color: sport.isActive ? '#1A1B4B' : '#777777',
                    backgroundColor: sport.isActive ? 'grey' : '#fff',
                  }}
                  onClick={() => toggleSport(sport)}
                >
                  {sport.name}
                </Box>
              );
            }
          })}
      </Box>
    </Box>
  );
};

export default Btns;
