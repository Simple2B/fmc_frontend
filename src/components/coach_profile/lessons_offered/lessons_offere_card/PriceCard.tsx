import { Box } from '@mui/material';
import * as React from 'react';

const testData = [
  {
    title: '1 hours',
    value: '$65',
    disable: false,
  },
  {
    title: '3 hours',
    value: '$180',
    subTitle: 'You save 30$',
    disable: true,
  },
  {
    title: '6 hours',
    value: '$360',
    subTitle: 'You save 30$',
    disable: true,
  },
];

export interface IPriceCard {}

const PriceCard: React.FC<IPriceCard> = () => {
  // const matches650 = useMediaQuery('(max-width:650px)');

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
      gap={1}
    >
      {testData.map((item, index) => {
        return (
          <Box
            key={index}
            sx={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0px 0px 5px rgba(114, 112, 112, 0.25)',
              borderRadius: '10px',
              p: '50px 28px',
            }}
          >
            {item.subTitle && (
              <Box
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '15px',
                  fontWeight: '400',
                  color: 'rgba(0, 0, 0, 0.87)',
                  position: 'absolute',
                  top: '-13px',
                  p: '5px 15px',
                  backgroundColor: 'rgba(240, 85, 71, 0.29)',
                  borderRadius: '8px',
                }}
              >
                {item.subTitle}
              </Box>
            )}
            <Box
              sx={{
                width: '100%',
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                fontWeight: '400',
                color: '#394454',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                pb: '18px',
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
                pb: '30px',
              }}
            >
              {item.value}
            </Box>
            <Box
              sx={{
                fontFamily: 'Work Sans, sans-serif',
                fontWeight: 600,
                fontSize: '18px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: '13px 19px',
                borderRadius: '7px',
                color: '#ffffff',
                backgroundColor: item.disable ? 'grey' : '#1976d2',
                cursor: 'pointer',
                transition: 'ease-in-out 0.3s all',
                '&:hover': {
                  backgroundColor: item.disable ? 'grey' : '#222CDF',
                  transition: 'ease-in-out 0.3s all',
                },
              }}
            >
              Select
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default PriceCard;
