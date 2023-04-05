import AuthenticatedLayout from '@/components/layouts/authenticated/AuthenticatedLayouts';

import { instance } from '@/fast_api_backend/api/_axiosInstance';

import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import moment from 'moment';

import { coachClientApi } from '@/fast_api_backend/api/usersInstance/coach/coachInstance';
import { UserType } from '@/store/types/user';
import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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

const LoginPage = dynamic(() => import('../../../sign_in/coach'));

export default function CalendarAddHours() {
  const router = useRouter();

  const [isLogIn, setIsLogIn] = useState<boolean | null>(null);
  const [isOpenMobSideBar, setIsOpenMobSideBar] = useState<boolean>(false);
  useEffect(() => {
    const whoAmI = async () => {
      try {
        const response = await instance().get('/whoami/coach');
        const res = response.data;
        console.log(`[GET] check coach -> res data  ${res}`);
        setIsLogIn(true);
        const coachProfile = await coachClientApi.coachGetProfile();
        console.log('[CalendarAddHours] coachProfile => ', coachProfile);
      } catch (error: any) {
        console.log(
          `[GET] check coach -> error message => ${error.response.status}`
        );
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        setIsLogIn(false);
        router.push('/sign_in/coach');
      }
    };
    whoAmI();
  }, [router, router.asPath]);

  const closeOpenMobSideBar = () => {
    setIsOpenMobSideBar(!isOpenMobSideBar);
  };

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
  //   const goToToday = (props: ToolbarProps) => {
  //     props.onNavigate(Navigate.TODAY);
  //   };
  //   // for a datepicker such as MUI or React Widgets ones ( function on datepicker onChange )
  //   const goToSpecificDate = (props: ToolbarProps, newDate: Date) => {
  //     props.onNavigate(Navigate.DATE, newDate);
  //   };

  return (
    <>
      {/* TODO: add component Head */}
      <Head>
        <title>Profile Coach</title>
        <meta name="description" content="Profile Coach" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLogIn ? (
        <AuthenticatedLayout
          userType={UserType.coach}
          listItems={[]}
          isOpenMobSideBar={isOpenMobSideBar}
          closeOpenMobSideBar={closeOpenMobSideBar}
        >
          <Box flex={1} p={2}>
            <Box sx={{ width: '100%', position: 'relative' }}>
              <Box
                sx={{
                  position: 'absolute',
                  top: '-41px',
                  left: '5px',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sens-serif',
                  fontWeight: 600,
                  fontSize: '16px',
                  color: '#000000',
                  borderBottom: '1px solid #000000',
                }}
                onClick={() => router.push('/profiles/coach?my_appointments')}
              >
                Back
              </Box>
              <Box
                sx={{
                  fontFamily: 'Inter, sens-serif',
                  fontWeight: 600,
                  fontSize: '36px',
                  color: '#000000',
                  mt: '41px',
                  mb: '16px',
                }}
              >
                Edit available work hours
              </Box>
              <Box
                sx={{
                  fontFamily: 'Inter, sens-serif',
                  fontWeight: 400,
                  fontSize: '16px',
                  color: '#000000',
                }}
              >
                Select and drag to mark available hours
              </Box>
              <Box />
              <Calendar
                localizer={localizer}
                // events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                views={['month', 'week', 'day']}
                defaultView={viewState}
                style={{ height: '78vh' }}
                components={{
                  toolbar: (props) => (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        mt: '31px',
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
          </Box>
        </AuthenticatedLayout>
      ) : (
        <LoginPage />
      )}
    </>
  );
}
