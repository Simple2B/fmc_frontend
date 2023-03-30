import { Box } from '@mui/material';
import * as React from 'react';

export interface ILessonsOfferedCards {}

interface ILessonsOfferedCard {
  title: string;
  description: string;
  itemsDescription: string[];
  location: { name: string; address: string }[];
  children?: any;
}

const testData: ILessonsOfferedCard[] = [
  {
    title: '1-on-1 Tennis Lessons',
    description:
      'Tincidunt commodo eu curabitur interdum lacinia ullamcorper purus. Eleifend eget accumsan in donec maecenas tempor. ',
    itemsDescription: [
      '60 minutes of tennis training',
      'Tennis equipment provided',
      'Tennis equipment provided',
      '60 minutes of tennis training',
      '60 minutes of tennis training',
      'Tennis equipment provided',
      'Tennis equipment provided',
    ],
    location: [
      {
        name: 'Reagal Tennis Club',
        address: '64 Deer Ridge Dr., Santa Cruz, CA 10001 (map)',
      },
      {
        name: 'Green Tennis Club',
        address: '64 Alder St., Santa Cruz, CA 10001',
      },
    ],
  },
  {
    title: 'Group Tennis Lesson',
    description:
      'Tincidunt commodo eu curabitur interdum lacinia ullamcorper purus. Eleifend eget accumsan in donec maecenas tempor. ',
    itemsDescription: [
      '60 minutes of tennis training',
      'Tennis equipment provided',
      'Tennis equipment provided',
      '60 minutes of tennis training',
      '60 minutes of tennis training',
      'Tennis equipment provided',
      'Tennis equipment provided',
    ],
    location: [
      {
        name: 'Reagal Tennis Club',
        address: '64 Deer Ridge Dr., Santa Cruz, CA 10001 (map)',
      },
      {
        name: 'Green Tennis Club',
        address: '64 Alder St., Santa Cruz, CA 10001',
      },
    ],
  },
];

const LessonsOfferedCards: React.FC<ILessonsOfferedCards> = () => {
  // const matches650 = useMediaQuery('(max-width:650px)');
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
      gap={3}
    >
      {testData.map((item, index) => {
        return (
          <Box
            sx={{
              width: '100%',
              boxShadow: '0px 0px 13px -2px rgba(75, 75, 75, 0.25)',
              borderRadius: ' 8px',
            }}
            key={index}
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
              {item.title}
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                m: '35px 28px',
              }}
            >
              <Box flex={1}>
                <Box
                  sx={{
                    fontFamily: 'Work Sans, sans-serif',
                    fontSize: '18px',
                    fontWeight: '400',
                    color: '#394454',
                  }}
                >
                  {item.description}
                </Box>
                <Box>
                  {item.itemsDescription.map((itemDescription, ind) => {
                    return (
                      <Box key={ind}>
                        <Box></Box>
                        <Box>{itemDescription}</Box>
                      </Box>
                    );
                  })}
                </Box>
                <Box>2 Locations</Box>
                <Box>
                  {item.location.map((val, i) => {
                    return (
                      <Box key={i}>
                        <Box>{val.name}</Box>
                        <Box>{val.address}</Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
              {/* TODO: block for card subscription */}
              <Box flex={1}>Sub</Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default LessonsOfferedCards;
