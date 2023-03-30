import { Box, Rating, Slider } from '@mui/material';
import * as React from 'react';

function valuetextSlider(value: number) {
  return `${value} $`;
}

export interface IFilterForm {
  toggleFilterForm: () => void;
}

const FilterForm: React.FC<IFilterForm> = ({ toggleFilterForm }) => {
  // const matches845 = useMediaQuery('(max-width:845px)');

  const [valueSlider, setValueSlider] = React.useState<number[]>([1, 15]);

  const handleChangeSlider = (event: Event, newValue: number | number[]) => {
    setValueSlider(newValue as number[]);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        boxShadow: '0px 0px 4px rgba(132, 119, 119, 0.25)',
        borderRadius: '8px',
        p: '47px 55px',
        position: 'absolute',
        top: '50px',
        right: '0px',
        zIndex: 2000,
      }}
    >
      <Box
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '18px',
          fontWeight: '600',
          color: '#000000',
          pb: '8px',
        }}
      >
        Price range
      </Box>
      <Box
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          fontWeight: '600',
          color: '#222CDF',
          pb: '14px',
        }}
      >
        2-2000$
      </Box>
      <Box sx={{ width: '100%', pb: '44px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              fontWeight: '400',
              color: '#595959',
            }}
          >
            $1
          </Box>
          <Box
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              fontWeight: '400',
              color: '#595959',
            }}
          >
            1000+
          </Box>
        </Box>

        <Slider
          getAriaLabel={() => 'Money range'}
          value={valueSlider}
          onChange={handleChangeSlider}
          // valueLabelDisplay="auto"
          getAriaValueText={valuetextSlider}
        />
      </Box>
      <Box
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '18px',
          fontWeight: '600',
          color: '#000000',
          pb: '8px',
        }}
      >
        Coach ratings
      </Box>
      <Box
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          fontWeight: '400',
          color: '#595959',
          pb: '18px',
        }}
      >
        Choose the minimum coach rating
      </Box>
      <Box sx={{ pb: '41px' }}>
        <Rating
          name="simple-controlled"
          // value={value}
          // onChange={(event, newValue) => {
          //   setValue(newValue);
          // }}
        />
      </Box>
      <Box
        onClick={() => toggleFilterForm()}
        sx={{
          width: 289,
          height: 44,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '8px',
          backgroundColor: '#1664C0',
          fontFamily: 'Inter, sans-serif',
          fontSize: '18px',
          fontWeight: '600',
          color: '#ffffff',
          cursor: 'pointer',
          transition: '.3s ease all',
          '&:hover': {
            backgroundColor: '#222CDF',
            transition: '.3s ease all',
          },
        }}
      >
        Filter
      </Box>
    </Box>
  );
};

export default FilterForm;
