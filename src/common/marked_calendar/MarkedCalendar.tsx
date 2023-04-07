import { CalendarContext } from '@/context/calendarContext';
import { LessonService } from '@/services';
import { Badge } from '@mui/material';
import {
  PickersDay,
  PickersDayProps,
  StaticDatePicker,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useContext } from 'react';
import { useQuery } from 'react-query';

function DayWithHighLight(
  props: PickersDayProps<Date> & { highlightedDays?: number[] }
) {
  const { highlightedDays, day, ...other } = props;

  const hasEvents =
    highlightedDays && highlightedDays?.includes(props.day.getTime());

  return (
    <Badge
      key={props.day.toString()}
      variant="dot"
      color="primary"
      overlap="circular"
      invisible={!hasEvents}
    >
      <PickersDay {...other} day={day} />
    </Badge>
  );
}

const MarkedCalendar = () => {
  const { calendarState, setSelectedDate } = useContext(CalendarContext);

  const { data } = useQuery(['studentLessons'], async () => {
    const res = await LessonService.apiGetLessonsForStudent();
    return res.map((lesson) => new Date(lesson.appointment_time).getTime());
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        value={calendarState.selectedDate}
        orientation="portrait"
        onChange={(newValue) => {
          if (!newValue) return;
          setSelectedDate(newValue);
        }}
        sx={{
          borderRadius: '18px',
          '& .MuiTypography-root': {
            display: 'none',
          },
          '& .MuiDialogActions-root': {
            display: 'none',
          },
          '& .MuiPickersFadeTransitionGroup-root': {
            color: '#000',
          },
        }}
        slots={{
          day: DayWithHighLight,
        }}
        slotProps={{ day: { highlightedDays: data ?? [] } as any }} // any type casting from MUI docs
      />
    </LocalizationProvider>
  );
};

export default MarkedCalendar;
