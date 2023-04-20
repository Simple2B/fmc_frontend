import { Box, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import * as React from 'react';
import checkMark from '../../../../../public/check_mark.png';

interface ILessonsOfferedCards {
  title: string;
  description: string;
  itemsDescription: string[];
  location: { name: string; address: string }[];
  children?: any;
}

const LessonsOfferedCards: React.FC<ILessonsOfferedCards> = ({
  title,
  description,
  itemsDescription,
  location,
  children,
}) => {
  const matches650 = useMediaQuery('(max-width:650px)');
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        mb: matches650 ? '30px' : '60px',
      }}
    >
      <Box
        sx={{
          width: '100%',
          boxShadow: '0px 0px 13px -2px rgba(75, 75, 75, 0.25)',
          borderRadius: ' 8px',
        }}
      >
        <Box
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '28px',
            fontWeight: '600',
            color: '#394454',
            p: '20px 29px',
            backgroundColor: '#F2F6F7',
          }}
        >
          {title}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: matches650 ? 'center' : 'space-between',
            flexDirection: matches650 ? 'column' : 'row',
            m: '35px 28px',
          }}
        >
          <Box flex={1.3}>
            <Box
              sx={{
                fontFamily: 'Work Sans, sans-serif',
                fontSize: '18px',
                fontWeight: '400',
                lineHeight: '27px',
                color: '#394454',
                mb: '25px',
              }}
            >
              {description}
            </Box>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                mb: '78px',
              }}
              gap={1.5}
            >
              {itemsDescription.map((itemDescription, ind) => {
                return (
                  <Box key={ind} sx={{ display: 'flex' }} gap={1}>
                    <Box>
                      <Image
                        src={checkMark}
                        alt={'check mark'}
                        width={18}
                        height={14}
                      />
                    </Box>
                    <Box>{itemDescription}</Box>
                  </Box>
                );
              })}
            </Box>
            <Box
              sx={{
                fontFamily: 'Work Sans, sans-serif',
                fontSize: '18px',
                fontWeight: '600',
                color: '#394454',
                mb: '28px',
              }}
            >
              2 Locations
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: matches650 ? 'column' : 'row',
                alignItems: matches650 ? 'flex-start' : 'center',
              }}
              gap={1}
            >
              {location.map((val, i) => {
                return (
                  <Box key={i}>
                    <Box
                      sx={{
                        fontFamily: 'Work Sans, sans-serif',
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#394454',
                        mb: '4px',
                        mr: '25px',
                      }}
                    >
                      {i + 1}.{val.name}
                    </Box>
                    <Box
                      sx={{
                        fontFamily: 'Work Sans, sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                        color: '#394454',
                      }}
                    >
                      {val.address}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
          <Box flex={0.7} sx={{ mt: matches650 ? '25px' : '0px' }}>
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LessonsOfferedCards;
