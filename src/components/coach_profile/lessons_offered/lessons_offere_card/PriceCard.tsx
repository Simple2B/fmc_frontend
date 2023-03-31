import { Box } from '@mui/material';
import * as React from 'react';

const testData = [
  {
    title: '1 hours',
    value: '$65',
  },
  {
    title: '3 hours',
    value: '$180',
    subTitle: 'You save 30$',
  },
  {
    title: '6 hours',
    value: '$360',
    subTitle: 'You save 30$',
  },
];

export interface IPriceCard {}

const PriceCard: React.FC<IPriceCard> = () => {
  // const matches650 = useMediaQuery('(max-width:650px)');

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      gap={1}
    >
      {testData.map((item, index) => {
        return (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {item.value && <Box>{item.value}</Box>}
            <Box
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                fontWeight: '400',
                color: '#394454',
              }}
            >
              {item.title}
            </Box>
            <Box
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '28px',
                fontWeight: '600',
                color: '#F05547',
              }}
            >
              {item.value}
            </Box>
            <Box>Select</Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default PriceCard;
