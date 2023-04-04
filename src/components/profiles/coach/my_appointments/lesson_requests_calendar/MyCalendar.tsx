import Box from '@mui/material/Box';
import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import * as React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export interface IMyCalendar {}

const MyCalendar: React.FC<IMyCalendar> = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Calendar
        localizer={localizer}
        // events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '75vh' }}
      />
      {/* <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" /> */}
    </Box>
  );
};

export default MyCalendar;
