import { FilterAlt } from '@mui/icons-material';
import { Box } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import FilterForm from './FilterForm';

export interface IFilterBtn {}

const FilterBtn: React.FC<IFilterBtn> = () => {
  const [isOpenFilterForm, setIsOpenFilterForm] = useState<boolean>(false);
  const toggleFilterForm = () => {
    setIsOpenFilterForm(!isOpenFilterForm);
  };
  return (
    <Box
      sx={{
        position: 'relative',
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
        onClick={toggleFilterForm}
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
      {isOpenFilterForm && <FilterForm toggleFilterForm={toggleFilterForm} />}
    </Box>
  );
};

export default FilterBtn;
