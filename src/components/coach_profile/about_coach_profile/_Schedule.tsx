import { Autocomplete, Box, TextField, useMediaQuery } from '@mui/material';
import * as React from 'react';

const testDayData = [
  {
    day: 'Mon',
    date: 'Aug 16',
    time: ['9:30 AM', '9:30 AM', '9:30 AM', '9:30 AM', '9:30 AM'],
  },
  {
    day: 'Tue',
    date: 'Aug 17',
    time: ['9:30 AM', '9:30 AM', '', '9:30 AM', ''],
  },
  {
    day: 'Wed',
    date: 'Aug 18',
    time: ['', '9:30 AM', '', '9:30 AM', ''],
  },
  {
    day: 'Thu',
    date: 'Aug 19',
    time: ['9:30 AM', '9:30 AM', '9:30 AM', '9:30 AM', '9:30 AM'],
  },
];

export interface ISchedule {}

const Schedule: React.FC<ISchedule> = () => {
  const matches950 = useMediaQuery('(max-width:950px)');
  // const [isOpenFilterForm, setIsOpenFilterForm] = useState<boolean>(false);
  // const toggleFilterForm = () => {
  //   setIsOpenFilterForm(!isOpenFilterForm);
  // };

  const optionsLocations = ['London Park, W 54th St', 'London'];
  return (
    <Box
      flex={1}
      sx={{
        alignSelf: matches950 ? 'center' : 'flex-start',
        maxWidth: 515,
        width: '100%',
        height: 435,
        boxShadow: '0px 0px 17px rgba(160, 160, 160, 0.25)',
        borderRadius: '16px',
        p: '24px 37px',
      }}
    >
      <Box
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '20px',
          fontWeight: '600',
          color: '#333333',
          mb: '16px',
        }}
      >
        Schedule
      </Box>
      <Box sx={{ width: '100%', mb: '8px' }}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={optionsLocations}
          value={optionsLocations[0]}
          sx={{ width: '100%', borderRadius: '12px' }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Locations"
              sx={{ borderRadius: '12px' }}
            />
          )}
        />
      </Box>
      <Box
        sx={{
          position: 'relative',
          height: '72%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          p: '29px',
          border: '1px solid #CBCBCB',
          borderRadius: '16px',
        }}
      >
        <Box
          sx={{
            border: 'solid black',
            borderWidth: '0 1.5px 1.5px 0',
            display: 'inline-block',
            padding: '4px',
            transform: 'rotate(135deg)',
            cursor: 'pointer',
            position: 'absolute',
            top: '36px',
            left: '17px',
          }}
        />
        <Box
          flex={4}
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          {testDayData.map((item, index) => {
            return (
              <Box
                key={index}
                sx={{
                  height: '100%',
                  alignSelf: 'flex-start',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mb: '6px',
                  }}
                >
                  <Box
                    sx={{
                      fontFamily: 'Inter',
                      fontWeight: 400,
                      fontSize: '12px',
                      mb: '5px',
                    }}
                  >
                    {item.day}
                  </Box>
                  <Box
                    sx={{
                      fontFamily: 'Inter',
                      fontWeight: 600,
                      fontSize: '12px',
                    }}
                  >
                    {item.date}
                  </Box>
                </Box>
                <Box
                  sx={{
                    mt: '5px',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'space-around',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  {item.time.map((time, i) => {
                    if (time.length === 0) {
                      return <Box key={i}>-</Box>;
                    }
                    return (
                      <Box
                        key={i}
                        sx={{
                          cursor: 'pointer',
                          fontFamily: 'Inter',
                          fontWeight: 500,
                          fontSize: '12px',
                          color: '#333333',
                          p: '9px 11px',
                          background: 'rgba(34, 44, 223, 0.1)',
                          borderRadius: '4px',
                        }}
                      >
                        {time}
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            );
          })}
        </Box>
        <Box
          sx={{
            border: 'solid black',
            borderWidth: '0 1.5px 1.5px 0',
            display: 'inline-block',
            padding: '4px',
            transform: 'rotate(-45deg)',
            cursor: 'pointer',
            position: 'absolute',
            top: '36px',
            right: '17px',
          }}
        />
      </Box>
    </Box>
  );
};

export default Schedule;
