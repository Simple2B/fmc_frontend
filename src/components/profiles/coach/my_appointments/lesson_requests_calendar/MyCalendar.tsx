/* eslint-disable no-unused-vars */
import Box from '@mui/material/Box';
import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import moment from 'moment';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState } from 'react';
import {
  Calendar,
  Navigate,
  ToolbarProps,
  View,
  dateFnsLocalizer,
} from 'react-big-calendar';

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

const CustomToolbar = (props: ToolbarProps) => {
  const [viewState, setViewState] = useState('week');

  const goToDayView = () => {
    props.onView('day');
    setViewState('day');
  };
  const goToWeekView = () => {
    props.onView('week');
    setViewState('week');
  };
  const goToMonthView = () => {
    props.onView('month');
    setViewState('month');
  };

  const goToBack = () => {
    props.onNavigate(Navigate.PREVIOUS);
  };

  const goToNext = () => {
    props.onNavigate(Navigate.NEXT);
  };

  return (
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
            onClick={goToBack}
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
            onClick={goToNext}
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
            backgroundColor: viewState === 'day' ? '#BFC1C3' : '#ffffff',
          }}
          onClick={goToDayView}
        >
          day
        </Box>
        <Box
          sx={{
            ...btnStyle,
            backgroundColor: viewState === 'week' ? '#BFC1C3' : '#ffffff',
          }}
          onClick={goToWeekView}
        >
          week
        </Box>
        <Box
          sx={{
            ...btnStyle,
            borderBottomRightRadius: '6px',
            borderTopRightRadius: '6px',
            backgroundColor: viewState === 'month' ? '#BFC1C3' : '#ffffff',
          }}
          onClick={goToMonthView}
        >
          month
        </Box>
      </Box>
    </Box>
  );
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
  const goToToday = (props: ToolbarProps) => {
    props.onNavigate(Navigate.TODAY);
  };
  // for a datepicker such as MUI or React Widgets ones ( function on datepicker onChange )
  const goToSpecificDate = (props: ToolbarProps, newDate: Date) => {
    props.onNavigate(Navigate.DATE, newDate);
  };
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
        // events={myEventsList}
        startAccessor="start"
        endAccessor="end"
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
                  {/* {`${moment(props.date).format('MMMM DD')} -
                     ${moment(moment(props.date).add(6, 'd').format('DD'))}`} */}
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
      />
    </Box>
  );
};

export default MyCalendar;
