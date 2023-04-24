import { ProfilesService } from '@/services/services/ProfilesService';
import { PaymentCheckState } from '@/store/types/users/coach/profileType';
import { Autocomplete, Box, TextField, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import ScheduleColumn from './_ScheduleColumn';

export interface ISchedule {
  maxWidth?: number | string;
  isLogIn: boolean | null;
  userType: string | null;
  isPaymentCheck: PaymentCheckState;
  setIsPaymentCheck: React.Dispatch<React.SetStateAction<PaymentCheckState>>;
}

const Schedule: React.FC<ISchedule> = ({
  maxWidth = 515,
  isLogIn,
  userType,
  isPaymentCheck,
  setIsPaymentCheck,
}) => {
  const matches950 = useMediaQuery('(max-width:950px)');

  const router = useRouter();
  const coachUuid = router.query.uuid_coach;
  const today = new Date();
  console.log(' TODAY => ', today.toISOString().split('T')[0]);

  function addDays(days: number) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  }

  // eslint-disable-next-line no-unused-vars
  const [dates, setDates] = useState<{ [key: number]: string[] }>({
    1: [today.toISOString().split('T')[0], addDays(1), addDays(2), addDays(3)],
  });

  const [dateSlotKey, setDateSlotKey] = useState<number>(1);

  const [optionsLocations, setOptionsLocations] = useState<
    { address: string; id: number }[]
  >([]);
  const [location, setLocation] = useState<{
    address: string;
    id: number;
  } | null>(null);

  // useQuery(['coachLocationSchedule', location], async () => {
  //   // const result = await ProfilesService.apiGetCoachByUuid();
  //   // return result;
  // });

  useQuery(['coachProfile', coachUuid, isPaymentCheck], async () => {
    if (typeof coachUuid === 'string') {
      const result = await ProfilesService.apiGetCoachByUuid(coachUuid);
      console.log('[Schedule] coachProfile result =>> ', result);
      if (result.locations.length > 0) {
        const addressData = result.locations.map((loc) => {
          return {
            address: loc.city + ', ' + loc.street + ', ' + loc.postal_code,
            id: loc.id,
          };
        });
        setOptionsLocations(addressData);
        setLocation(addressData[0]);
      }
      return result;
    }
  });

  const addDateForSchedule = () => {
    const indexLastSlotDate = Object.keys(dates).length;
    const nextKey = Number(indexLastSlotDate) + 1;
    const indexLastDate = Number(indexLastSlotDate) * 4;
    const nextValue = [
      addDays(indexLastDate),
      addDays(indexLastDate + 1),
      addDays(indexLastDate + 2),
      addDays(indexLastDate + 3),
    ];
    setDateSlotKey(Number(indexLastSlotDate) + 1);
    setDates((prev) => ({ ...prev, [nextKey]: nextValue }));
  };

  const removeDateForSchedule = () => {
    delete dates[dateSlotKey];
    setDateSlotKey(dateSlotKey - 1);
  };

  return (
    <Box
      flex={1}
      sx={{
        alignSelf: matches950 ? 'center' : 'flex-start',
        maxWidth: matches950 ? 320 : maxWidth,
        width: '100%',
        // height: 435,
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
          options={optionsLocations.map((options) => options.address)}
          value={location ? location.address : ''}
          onChange={(event: any, newValue: string | null) => {
            const scheduleData = optionsLocations.filter(
              (p) => p.address === newValue
            );
            let id = 0;
            if (scheduleData.length === 1) {
              id = scheduleData[0].id;
            }
            setLocation({
              address: newValue ?? '',
              id: id,
            });
          }}
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
          // height: '75%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          p: '26px',
          border: '1px solid #CBCBCB',
          borderRadius: '16px',
        }}
      >
        {Object.keys(dates).length > 1 && (
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
            onClick={removeDateForSchedule}
          />
        )}
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
          {dates[dateSlotKey].map((date, index) => {
            return (
              <ScheduleColumn
                key={index}
                day={date}
                isLogIn={isLogIn}
                userType={userType}
                isPaymentCheck={isPaymentCheck}
                setIsPaymentCheck={setIsPaymentCheck}
                locationId={location ? location.id : 0}
              />
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
          onClick={addDateForSchedule}
        />
      </Box>
    </Box>
  );
};

export default Schedule;
