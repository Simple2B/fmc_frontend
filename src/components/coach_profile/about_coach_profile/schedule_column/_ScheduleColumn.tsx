import { CoachScheduleService } from '@/services/services/CoachScheduleService';
import { StripeService } from '@/services/services/StripeService';
import { Box } from '@mui/material';
import moment from 'moment';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export interface IScheduleColumn {
  day: string;
  // date: string;
  // times: string[];
}

const ScheduleColumn: React.FC<IScheduleColumn> = ({ day }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const coachUuid = router.query.uuid_coach;

  const [daysData, setDaysData] = useState<{
    day: string;
    date: string;
    times: { uuid: string; time: string; isActive: boolean }[];
  }>();

  useQuery(['schedules', day], async () => {
    if (typeof coachUuid === 'string') {
      const result = await CoachScheduleService.apiGetCoachSchedulesByUuid(
        coachUuid,
        day
      );
      const startDate = moment(result.schedules[0].start_datetime)
        .format('llll')
        .split(',');
      const dayName = startDate[0];
      const date = startDate[1];
      const times = result.schedules.map((schedule) => ({
        uuid: schedule.uuid,
        time: moment(schedule.start_datetime).format('LT'),
        isActive: false,
      }));
      setDaysData({
        day: dayName,
        date: date,
        times: times,
      });
      return result;
    }
  });

  // TODO: will done multiply times booking (now one time)
  const mutationSchedulesFunction = useMutation(
    async (scheduleUuids: string) => {
      return await StripeService.apiReserveBooking([scheduleUuids]);
    },
    {
      onSuccess: (res) => {
        console.log('[onSuccess] => res', res);
        window.location.href = res;
        queryClient.invalidateQueries('schedules');
      },
    }
  );

  const bookedTime = (uuid: string) => {
    if (daysData) {
      const newTimes = daysData.times.map((time) => {
        if (time.uuid === uuid) {
          return {
            ...time,
            isActive: !time.isActive,
          };
        }
        return time;
      });
      setDaysData({
        ...daysData,
        times: newTimes,
      });
    }
    mutationSchedulesFunction.mutate(uuid);
  };

  return (
    <Box
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
          {daysData?.day}
        </Box>
        <Box
          sx={{
            fontFamily: 'Inter',
            fontWeight: 600,
            fontSize: '12px',
          }}
        >
          {daysData?.date}
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
        {daysData &&
          daysData.times.length > 0 &&
          daysData.times.map((value, i) => {
            if (!value.time) {
              return <Box key={i}>-</Box>;
            }
            return (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  fontFamily: 'Inter',
                  fontWeight: 500,
                  fontSize: '12px',
                  color: value.isActive ? '#ffffff' : '#333333',
                  // p: '9px 11px',
                  width: '102.98px',
                  height: '32.06px',
                  background: value.isActive
                    ? '#1976d2'
                    : 'rgba(34, 44, 223, 0.1)',
                  borderRadius: '4px',
                  transition: 'ease-in-out 0.3s all',
                  '&:hover': {
                    color: '#ffffff',
                    backgroundColor: '#1976d2',
                    transition: 'ease-in-out 0.3s all',
                  },
                }}
                onClick={() => bookedTime(value.uuid)}
              >
                {value.time}
              </Box>
            );
          })}
      </Box>
    </Box>
  );
};

export default ScheduleColumn;
