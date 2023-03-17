import { StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';
// export interface IMarkedCalendar {}

const MarkedCalendar = () => {
  const [value, setValue] = useState(new Date());
  // const [highlightedDays, setHighlightedDays] = useState([1, 2, 13]);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {/* <DemoContainer components={['DatePicker']}>
        <DemoItem label=""> */}
      <StaticDatePicker
        orientation="portrait"
        openTo="day"
        value={value}
        onChange={(newValue) => {
          if (newValue) setValue(newValue);
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
        // renderInput={(params) => <TextField {...params} />}
        // renderDay={(day, _value, DayComponentProps) => {
        //   const isSelected =
        //     !DayComponentProps.outsideCurrentMonth &&
        //     highlightedDays.indexOf(day.getDate()) >= 0;
        //   return (
        //     <Badge
        //       key={day.toString()}
        //       overlap="circular"
        //       badgeContent={isSelected ? <FiberManualRecord /> : undefined}
        //     >
        //       <PickersDay {...DayComponentProps} />
        //     </Badge>
        //   );
        // }}
        // slots={}
      />
      {/* </DemoItem>
      </DemoContainer> */}
    </LocalizationProvider>
  );
};

export default MarkedCalendar;
