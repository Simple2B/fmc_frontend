import { StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { pickersDayClasses } from '@mui/lab/PickersDay';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import addDays from 'date-fns/addDays';
// import isSameDay from 'date-fns/isSameDay';
import { useState } from 'react';

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

const MarkedCalendar = () => {
  const [value, setValue] = useState<Date | null>(new Date());
  // const [highlightedDays, setHighlightedDays] = useState([1, 2, 13]);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        value={value}
        orientation="portrait"
        // renderDay={renderWeekPickerDay}
        onChange={(newValue) => {
          setValue(newValue);
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
        // slots={
        //   day: () => renderWeekPickerDay()
        // }
      />
    </LocalizationProvider>
  );
};

export default MarkedCalendar;
