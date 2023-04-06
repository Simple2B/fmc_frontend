/* eslint-disable no-unused-vars */
import Input from '@/common/input/Input';
import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import Box from '@mui/material/Box';
import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import moment from 'moment';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useCallback, useState } from 'react';
import {
  Calendar,
  Navigate,
  ToolbarProps,
  View,
  dateFnsLocalizer,
  stringOrDate,
} from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

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

const btnStyle = {
  width: '76px',
  height: '24px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Inter',
  fontWeight: 500,
  fontSize: '14px',
  color: '#333333',
  border: '0.5px solid #BFC1C3',
  cursor: 'pointer',
};

const DnDCalendar = withDragAndDrop(Calendar);

const nameInputStyles = {
  // mt: matches600 ? 1.5 : 4,
  '& .MuiInputBase-root': {
    position: 'relative',
  },
  '& .MuiFormHelperText-root': {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: '-20px',
  },
};

export interface IMyCalendar {}

const MyCalendar: React.FC<IMyCalendar> = () => {
  const router = useRouter();
  const [viewState, setViewState] = useState<View | undefined>('week');

  const goToDayView = (props: ToolbarProps) => {
    props.onView('day');
    setViewState('day');
  };
  const goToWeekView = (props: ToolbarProps) => {
    props.onView('week');
    setViewState('week');
  };
  const goToMonthView = (props: ToolbarProps) => {
    props.onView('month');
    setViewState('month');
  };
  const goToBack = (props: ToolbarProps) => {
    props.onNavigate(Navigate.PREVIOUS);
  };
  const goToNext = (props: ToolbarProps) => {
    props.onNavigate(Navigate.NEXT);
  };

  // const goToToday = (props: ToolbarProps) => {
  //   props.onNavigate(Navigate.TODAY);
  // };
  // // for a datepicker such as MUI or React Widgets ones ( function on datepicker onChange )
  // const goToSpecificDate = (props: ToolbarProps, newDate: Date) => {
  //   props.onNavigate(Navigate.DATE, newDate);
  // };

  const events = [
    {
      start: moment(new Date()).add({ hour: 1, minute: 0 }).toDate(),
      end: moment(new Date()).add({ hour: 2, minute: 0 }).toDate(),
      title: 'Title-1',
    },
    {
      start: moment(new Date()).add({ hour: 3, minute: 30 }).toDate(),
      end: moment(new Date()).add({ hour: 4, minute: 30 }).toDate(),
      title: 'Title-2',
    },
  ];

  const [myEvents, setEvents] = useState<
    {
      start: Date | string;
      end: Date | string;
      title: string;
    }[]
  >(events);

  const [openFormEvent, setIsOpenFormEvent] = useState<boolean>(false);

  // Form edit data
  const [dayName, setDayName] = useState<string>('');
  const [timeStart, setTimeStart] = useState<string>('');
  const [timeEnd, setTimeEnd] = useState<string>('');

  const [openFormEventCreate, setIsOpenFormEventCreate] =
    useState<boolean>(false);

  const handleSelectSlot = useCallback(
    ({ start, end }: any) => {
      setDayName(moment(start).format('dddd, MMMM Do'));
      setTimeStart(moment(start).format('LT'));
      setTimeEnd(moment(end).format('LT'));

      setIsOpenFormEvent(!openFormEvent);
      // if (title) {
      //   setEvents((prev) => [...prev, { start, end, title }]);
      // }
    },
    [openFormEvent]
  );

  // created event
  const [dayNameCreate, setDayNameCreate] = useState<string>('');
  const [timeStartCreate, setTimeStartCreate] = useState<string>('');
  const [timeEndCreate, setTimeEndCreate] = useState<string>('');

  const [location, setLocation] = useState<string | null>('London');
  const [packageSchedule, setPackage] = useState<string | null>(
    '1 on 1 Session'
  );

  const [name, setName] = useState<string>('');

  const [isValidDate, setIsValidDate] = useState<boolean>(false);

  function handleSelect(slotInfo: {
    start: stringOrDate;
    end: stringOrDate;
    slots: Date[] | string[];
    action: 'select' | 'click' | 'doubleClick';
  }) {
    const nowDate = new Date();

    setDayNameCreate(moment(slotInfo.start).format('dddd, MMMM Do'));
    setTimeStartCreate(moment(slotInfo.start).format('LT'));
    setTimeEndCreate(
      moment(slotInfo.start).add(moment.duration(1, 'hours')).format('LT')
    );
    setIsOpenFormEventCreate(!openFormEventCreate);

    // const title = '';
    // const title = window.prompt('New Event name');
    // if (title) {
    //   var newEvent = {
    //     start: slotInfo.start,
    //     end: slotInfo.end,
    //     title: title,
    //   };
    //   setEvents([...myEvents, newEvent]);
    // }
  }

  // const { defaultDate, scrollToTime } = useMemo(
  //   () => ({
  //     defaultDate: new Date(2015, 3, 12),
  //     scrollToTime: new Date(1970, 1, 1, 6),
  //   }),
  //   []
  // );

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: '5px',
          cursor: 'pointer',
          fontFamily: 'Inter, sens-serif',
          fontWeight: 600,
          fontSize: '16px',
          color: '#000000',
          borderBottom: '1px solid #000000',
        }}
        onClick={() => router.push('/profiles/coach/calendar/add_hours')}
      >
        Edit available hours
      </Box>

      <Calendar
        localizer={localizer}
        events={myEvents}
        // startAccessor="start"
        // endAccessor="end"
        views={['month', 'week', 'day']}
        defaultView={viewState}
        style={{ height: '75vh' }}
        components={{
          // month: {
          //   dateHeader: () => <div>Custom Date Header</div>,
          // },
          toolbar: (props) => (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}
              >
                <Box
                  sx={{
                    width: '152px',
                    mr: '15px',
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: '20px',
                  }}
                >
                  {moment(props.date).format('MMMM DD')}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: '16px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      pr: '22px',
                      color: '#333333',
                      cursor: 'pointer',
                      fontSize: '20px',
                      fontWeight: '500',
                    }}
                    onClick={() => goToBack(props)}
                  >
                    &#8249;
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: '#333333',
                      cursor: 'pointer',
                      fontSize: '20px',
                      fontWeight: '500',
                    }}
                    onClick={() => goToNext(props)}
                  >
                    &#8250;
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mb: '12px',
                }}
              >
                <Box
                  sx={{
                    ...btnStyle,
                    borderBottomLeftRadius: '6px',
                    borderTopLeftRadius: '6px',
                    backgroundColor:
                      viewState === 'day' ? '#BFC1C3' : '#ffffff',
                  }}
                  onClick={() => goToDayView(props)}
                >
                  day
                </Box>
                <Box
                  sx={{
                    ...btnStyle,
                    backgroundColor:
                      viewState === 'week' ? '#BFC1C3' : '#ffffff',
                  }}
                  onClick={() => goToWeekView(props)}
                >
                  week
                </Box>
                <Box
                  sx={{
                    ...btnStyle,
                    borderBottomRightRadius: '6px',
                    borderTopRightRadius: '6px',
                    backgroundColor:
                      viewState === 'month' ? '#BFC1C3' : '#ffffff',
                  }}
                  onClick={() => goToMonthView(props)}
                >
                  month
                </Box>
              </Box>
            </Box>
          ),
        }}
        onSelectEvent={handleSelectSlot}
        selectable={true}
        onSelectSlot={handleSelect}
        // onSelectStart={(start) => {
        //   console.log('[onSelectStart] start =>', start);
        // }}
        // scrollToTime={scrollToTime}
      />

      {openFormEvent && (
        <Box
          sx={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            zIndex: 10000,
            // backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}
        >
          <Box
            sx={{
              width: '396px',
              display: 'flex',
              justifyContent: 'flex-start',
              flexDirection: 'column',
              alignItems: 'flex-start',
              border: '1px solid #DBDBDB',
              boxShadow: '0px 2px 14px rgba(0, 0, 0, 0.12)',
              borderRadius: '14px',
              backgroundColor: '#FFFFFF',
              p: '32px',
            }}
          >
            <Box
              sx={{
                fontFamily: 'Inter, sens-serif',
                fontSize: '20px',
                fontWeight: 400,
                color: '#333333',
                borderBottom: '1px solid #333333',
                mb: '20px',
              }}
            >
              {dayName}
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mb: '16px',
              }}
            >
              <Box
                sx={{
                  fontFamily: 'Inter, sens-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#333333',
                  p: '8px',
                  border: '1px solid #DEDEDD',
                  borderRadius: '6px',
                  mr: '5px',
                }}
              >
                {timeStart}
              </Box>
              <Box sx={{ mr: '5px' }}> - </Box>
              <Box
                sx={{
                  fontFamily: 'Inter, sens-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#333333',
                  p: '8px',
                  border: '1px solid #DEDEDD',
                  borderRadius: '6px',
                }}
              >
                {timeEnd}
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <Box
                sx={{
                  fontFamily: 'Inter, sens-serif',
                  fontSize: '12px',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  color: '#9E9E9E',
                  mb: '16px',
                  mt: '16px',
                }}
              >
                Location
              </Box>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="London_1"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="London_1"
                    control={<Radio />}
                    label="London 1"
                  />
                  <FormControlLabel
                    value="London_2"
                    control={<Radio />}
                    label="London 2"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{
                  fontFamily: 'Inter, sens-serif',
                  fontSize: '12px',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  color: '#9E9E9E',
                  mb: '16px',
                  mt: '16px',
                }}
              >
                Repetition
              </Box>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="repeats_weekly"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="repeats_weekly"
                    control={<Radio />}
                    label="Repeats weekly"
                  />
                  <FormControlLabel
                    value="repeats_monthly"
                    control={<Radio />}
                    label="Repeats monthly"
                  />
                  <FormControlLabel
                    value="does_not_repeat"
                    control={<Radio />}
                    label="Does not repeat"
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            <Box sx={{ mt: '36px', width: '100%' }}>
              <Box sx={{ width: '100%', border: '1px solid #DBDBDB' }} />
              <Box
                sx={{
                  mt: '16px',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}
              >
                <Box
                  sx={{
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '64px',
                    height: '32px',
                    fontFamily: 'Inter, sens-serif',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#333333',
                    transition: 'easeOut 0.3s all',
                    '&:hover': {
                      color: '#F05547',
                      transition: 'easeOut 0.3s all',
                    },
                  }}
                  onClick={() => setIsOpenFormEvent(!openFormEvent)}
                >
                  Cancel
                </Box>
                <Box
                  sx={{
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '64px',
                    height: '32px',
                    fontFamily: 'Inter, sens-serif',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#ffffff',
                    backgroundColor: '#F05547',
                    borderRadius: '6px',
                    transition: 'easeOut 0.3s all',
                    '&:hover': {
                      boxShadow: '0px 0px 5px #F05547',
                      transition: 'easeOut 0.3s all',
                    },
                  }}
                >
                  Save
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {openFormEventCreate && (
        <Box
          sx={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            zIndex: 10000,
          }}
        >
          <Box
            sx={{
              width: '396px',
              display: 'flex',
              justifyContent: 'flex-start',
              flexDirection: 'column',
              alignItems: 'flex-start',
              border: '1px solid #DBDBDB',
              boxShadow: '0px 2px 14px rgba(0, 0, 0, 0.12)',
              borderRadius: '14px',
              backgroundColor: '#FFFFFF',
              p: '32px',
            }}
          >
            <Box
              sx={{
                fontFamily: 'Inter, sens-serif',
                fontSize: '20px',
                fontWeight: 400,
                color: '#333333',
                borderBottom: '1px solid #333333',
                mb: '20px',
              }}
            >
              {dayNameCreate}
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mb: '16px',
              }}
            >
              <Box
                sx={{
                  fontFamily: 'Inter, sens-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#333333',
                  p: '8px',
                  border: '1px solid #DEDEDD',
                  borderRadius: '6px',
                  mr: '5px',
                }}
              >
                {timeStartCreate}
              </Box>
              <Box sx={{ mr: '5px' }}> - </Box>
              <Box
                sx={{
                  fontFamily: 'Inter, sens-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#333333',
                  p: '8px',
                  border: '1px solid #DEDEDD',
                  borderRadius: '6px',
                }}
              >
                {timeEndCreate}
              </Box>
            </Box>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <Input
                name={'name'}
                label={'Title'}
                value={name}
                sx={{ ...nameInputStyles, width: '100%' }}
                onChange={(e) => setName(e.target.value)}
                type="text"
              />
            </Box>
            {/* <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <Box
                sx={{
                  fontFamily: 'Inter, sens-serif',
                  fontSize: '12px',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  color: '#9E9E9E',
                  mb: '16px',
                  mt: '16px',
                }}
              >
                Location
              </Box>
              <Autocomplete
                value={location}
                onChange={(event: any, newValue: string | null) => {
                  setLocation(newValue);
                }}
                id="controllable-states-demo"
                options={[]}
                sx={{ ...nameInputStyles, width: '100%' }}
                renderInput={(params: any) => (
                  <TextField {...params} label="Location" />
                )}
              />
            </Box> */}
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{
                  fontFamily: 'Inter, sens-serif',
                  fontSize: '12px',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  color: '#9E9E9E',
                  mb: '16px',
                  mt: '16px',
                }}
              >
                Package
              </Box>
              <Autocomplete
                value={packageSchedule}
                onChange={(event: any, newValue: string | null) => {
                  setPackage(newValue);
                }}
                id="controllable-states-demo"
                options={[]}
                sx={{ ...nameInputStyles, width: '100%' }}
                renderInput={(params: any) => (
                  <TextField {...params} label="Package" />
                )}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                flexDirection: 'column',
              }}
            >
              {/* <Box
                sx={{
                  fontFamily: 'Inter, sens-serif',
                  fontSize: '12px',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  color: '#9E9E9E',
                  mb: '16px',
                  mt: '16px',
                }}
              >
                Repetition
              </Box> */}
              {/* <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="repeats_weekly"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="repeats_weekly"
                    control={<Radio />}
                    label="Repeats weekly"
                  />
                  <FormControlLabel
                    value="repeats_monthly"
                    control={<Radio />}
                    label="Repeats monthly"
                  />
                  <FormControlLabel
                    value="does_not_repeat"
                    control={<Radio />}
                    label="Does not repeat"
                  />
                </RadioGroup>
              </FormControl> */}
            </Box>

            <Box sx={{ mt: '36px', width: '100%' }}>
              <Box sx={{ width: '100%', border: '1px solid #DBDBDB' }} />
              <Box
                sx={{
                  mt: '16px',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}
              >
                <Box
                  sx={{
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '64px',
                    height: '32px',
                    fontFamily: 'Inter, sens-serif',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#333333',
                    transition: 'easeOut 0.3s all',
                    '&:hover': {
                      color: '#F05547',
                      transition: 'easeOut 0.3s all',
                    },
                  }}
                  onClick={() => setIsOpenFormEventCreate(!openFormEventCreate)}
                >
                  Cancel
                </Box>
                <Box
                  sx={{
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '64px',
                    height: '32px',
                    fontFamily: 'Inter, sens-serif',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#ffffff',
                    backgroundColor: '#F05547',
                    borderRadius: '6px',
                    transition: 'easeOut 0.3s all',
                    '&:hover': {
                      boxShadow: '0px 0px 5px #F05547',
                      transition: 'easeOut 0.3s all',
                    },
                  }}
                >
                  Create
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MyCalendar;
