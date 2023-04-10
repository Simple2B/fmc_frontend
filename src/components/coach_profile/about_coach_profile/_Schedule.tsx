import { CoachScheduleService } from '@/services/services/CoachScheduleService';
import { ProfilesService } from '@/services/services/ProfilesService';
import { Autocomplete, Box, TextField, useMediaQuery } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';

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

export interface ISchedule {
  coachUuid: string | string[] | undefined;
  maxWidth?: number | string;
}

const Schedule: React.FC<ISchedule> = ({ coachUuid, maxWidth = 515 }) => {
  const matches950 = useMediaQuery('(max-width:950px)');

  // const [dayData, setDayData] = useState<
  //   {
  //     uuid: string;
  //     day: string;
  //     date: string;
  //     time: string[];
  //   }[]
  // >([]);

  const schedulesDataQuery = useQuery(['schedules', coachUuid], async () => {
    if (typeof coachUuid === 'string') {
      const result = await CoachScheduleService.apiGetCoachSchedulesByUuid(
        coachUuid
      );
      return result;
    }
  });

  console.log('[schedulesDataQuery] result => ', schedulesDataQuery);

  const [location, setLocation] = useState<string>('');

  const profileCoachDataQuery = useQuery(
    ['coachProfile', coachUuid],
    async () => {
      if (typeof coachUuid === 'string') {
        const result = await ProfilesService.apiGetCoachByUuid(coachUuid);
        if (result.locations.length > 0) {
          const address = result.locations.map((loc) => {
            return loc.city + ', ' + loc.street + ', ' + loc.postal_code;
          });
          // setOptionsLocations(address);
          setLocation(address[0]);
        }
        return result;
      }
    }
  );

  console.log(
    '[schedulesDataQuery] profileCoachDataQuery => ',
    profileCoachDataQuery
  );

  return (
    <Box
      flex={1}
      sx={{
        alignSelf: matches950 ? 'center' : 'flex-start',
        maxWidth: maxWidth,
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
          id="optionsLocations"
          options={
            profileCoachDataQuery.data
              ? profileCoachDataQuery.data.locations.map((loc) => {
                  return loc.city + ', ' + loc.street + ', ' + loc.postal_code;
                })
              : []
          }
          value={location}
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
