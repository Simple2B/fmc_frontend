import { FilterAlt } from '@mui/icons-material';
import { Box } from '@mui/material';
import * as React from 'react';

export interface IFilterBtn {}

const FilterBtn: React.FC<IFilterBtn> = () => {
  // const matches845 = useMediaQuery('(max-width:845px)');

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '106px',
          height: '45px',
          boxShadow: '0px 0px 4px rgba(117, 117, 117, 0.25)',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          '&:hover': {
            boxShadow: '0px 0px 4px #1876D1',
            borderRadius: '8px',
          },
        }}
      >
        <FilterAlt sx={{ color: '#1876D1' }} />
        <Box
          sx={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#000000',
            fontFamily: 'Inter',
          }}
        >
          Filter
        </Box>
      </Box>
    </Box>
  );
};

export default FilterBtn;
