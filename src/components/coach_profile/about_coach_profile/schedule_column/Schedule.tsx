import { ProfilesService } from '@/services/services/ProfilesService';
import { Autocomplete, Box, TextField, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import ScheduleColumn from './_ScheduleColumn';

export interface ISchedule {
  maxWidth?: number | string;
}

const Schedule: React.FC<ISchedule> = ({ maxWidth = 515 }) => {
  const matches950 = useMediaQuery('(max-width:950px)');

  const router = useRouter();
  const coachUuid = router.query.uuid_coach;
  const today = new Date();

  function addDays(days: number) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  }

  // eslint-disable-next-line no-unused-vars
  const [dates, setDates] = useState<string[]>([
    today.toISOString().split('T')[0],
    addDays(1),
    addDays(2),
    addDays(3),
  ]);

  const [optionsLocations, setOptionsLocations] = useState<string[]>([]);
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
          setOptionsLocations(address);
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
          options={optionsLocations}
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
          height: '75%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          p: '26px',
          border: '1px solid #CBCBCB',
          borderRadius: '16px',
        }}
      >
        {/* TODO: add on click to arrow  */}
        {/* <Box
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
        /> */}
        <Box
          flex={4}
          sx={{
            // pr: '1.5px',
            // pl: '1.5px',
            height: '100%',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          {dates.map((date, index) => {
            return <ScheduleColumn key={index} day={date} />;
          })}
        </Box>
        {/* <Box
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
        /> */}
      </Box>
    </Box>
  );
};

export default Schedule;
