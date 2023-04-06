import { CalendarContext } from '@/context/calendarContext';
import { Badge } from '@mui/material';
import {
  PickersDay,
  PickersDayProps,
  StaticDatePicker,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { pickersDayClasses } from '@mui/lab/PickersDay';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import addDays from 'date-fns/addDays';
// import isSameDay from 'date-fns/isSameDay';
import { useContext } from 'react';

// const birthday = addDays(new Date(), 3);
// const styles1 = {
//   color: 'red',
//   fontWeight: 'bold',
//   fontSize: 18,
//   textDecoration: 'underline',
// };
// const styles2 = {
//   backgroundColor: 'red',
//   color: 'white',
// };
// const styles3 = {
//   backgroundColor: 'purple',
//   color: 'white',
// };

// type HighlightedDay = {
//   date: Date;
//   styles: React.CSSProperties;
// };

// const highlightedDays: HighlightedDay[] = [
//   {
//     date: birthday,
//     styles: styles1,
//   },
//   {
//     date: addDays(new Date(), 6),
//     styles: styles2,
//   },
//   {
//     date: addDays(new Date(), 9),
//     styles: styles3,
//   },
//   {
//     date: addDays(new Date(), 12),
//     styles: styles2,
//   },
// ];

// const renderWeekPickerDay = (
//   date: Date,
//   selectedDates: Array<Date | null>,
//   pickersDayProps: PickersDayProps<Date>
// ) => {
//   const matchedStyles = highlightedDays.reduce((a, v) => {
//     return isSameDay(date, v.date) ? v.styles : a;
//   }, {});

//   return (
//     <PickersDay
//       {...pickersDayProps}
//       sx={{
//         ...matchedStyles,
//         [`&&.${(pickersDayClasses as any).selected}`]: {
//           backgroundColor: 'green',
//         },
//       }}
//     />
//   );
// };

// export interface IMarkedCalendar {}

// create my array of 3 dates, yesturday, today, tomorrow:
const highlightedDays = {
  extra: [
    new Date(new Date().setHours(0, 0, 0, 0)).getTime(),
    new Date(new Date('04-05-2023').setHours(0, 0, 0, 0)).getTime(),
    new Date(new Date('04-07-2023')).getTime(),
  ],
};

function CustomDay(
  props: PickersDayProps<Date> & { highlightedDays?: { extra: number[] } }
) {
  const { highlightedDays, day, outsideCurrentMonth, ...other } = props;

  const hasEvents = highlightedDays?.extra.includes(props.day.getTime());

  return (
    <Badge
      key={props.day.toString()}
      variant="dot"
      color="primary"
      overlap="circular"
      invisible={!hasEvents}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

const MarkedCalendar = () => {
  const { calendarState, setSelectedDate } = useContext(CalendarContext);
  // const

  // const {data} = useQuery(['events', calendarState.selectedDate], () => {
  // const [highlightedDays, setHighlightedDays] = useState([new Date(), 2, 13]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        value={calendarState.selectedDate}
        orientation="portrait"
        // renderDay={renderWeekPickerDay}
        onChange={(newValue) => {
          if (!newValue) return;
          setSelectedDate(newValue);
        }}
        // renderInput={(params: any) => <TextField {...params} />}
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
          day: CustomDay,
        }}
        slotProps={{ day: { highlightedDays } as any }} // any type casting from MUI docs
      />
    </LocalizationProvider>
  );
};

export default MarkedCalendar;
