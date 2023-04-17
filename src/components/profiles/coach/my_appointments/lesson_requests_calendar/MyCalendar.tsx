/* eslint-disable no-unused-vars */
import Loader from '@/common/loader/Loader';
import MessageBox from '@/common/message_box/MessageBox';
import CustomModel from '@/common/modal/Modal';
import { coachClientApi } from '@/fast_api_backend/api/usersInstance/coach/coachInstance';
import { coachSchedulesApi } from '@/fast_api_backend/api/usersInstance/coach/schedules';
import { getErrorMessage } from '@/helper/error_function';
import Box from '@mui/material/Box';
import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import moment from 'moment';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import {
  Calendar,
  Navigate,
  ToolbarProps,
  View,
  dateFnsLocalizer,
  stringOrDate,
} from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import FormSchedule from '../form_schedule/FormSchedule';

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

export interface IMyCalendar {}

const MyCalendar: React.FC<IMyCalendar> = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isLoad, setIsLoad] = React.useState<boolean>(false);
  const [isSuccess, setSuccess] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

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

  const [packagesSchedule, setPackagesSchedule] = useState<
    {
      name: string;
      id: number;
    }[]
  >([
    {
      name: '',
      id: 0,
    },
  ]);

  const [packageSchedule, setPackage] = useState<{
    name: string;
    id: number;
  } | null>({
    name: packagesSchedule[0].name,
    id: packagesSchedule[0].id,
  });

  useQuery(['packagesSchedule'], async () => {
    const request = coachClientApi.coachGetPackages;
    const result = await request();
    if (result.length > 0) {
      const resultData = result.map((s) => ({
        name: s.title,
        id: s.id,
      }));
      setPackagesSchedule(resultData);
      setPackage({
        name: packagesSchedule[0].name,
        id: packagesSchedule[0].id,
      });
    }
    return result;
  });

  const [myEvents, setEvents] = useState<
    {
      start: Date | string;
      end: Date | string;
      title: string;
      uuid: string;
      is_booked: boolean;
    }[]
  >([
    {
      start: '',
      end: '',
      title: '',
      uuid: '',
      is_booked: false,
    },
  ]);

  const schedulesDataQuery = useQuery(['schedulesData'], async () => {
    const result = await coachSchedulesApi.getSchedules();
    if (result.length > 0) {
      const resultData = result.map((s) => ({
        start: new Date(s.start_datetime),
        end: new Date(s.end_datetime),
        title: s.lesson.title,
        uuid: s.lesson.uuid,
        is_booked: s.is_booked,
      }));
      setEvents(resultData);
    }
    return result;
  });

  const [openFormEvent, setIsOpenFormEvent] = useState<boolean>(false);

  // Form edit data
  const [dayName, setDayName] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [timeStart, setTimeStart] = useState<string>('');
  const [timeEnd, setTimeEnd] = useState<string>('');

  const [openFormEventCreate, setIsOpenFormEventCreate] =
    useState<boolean>(false);

  const handleSelectSlot = useCallback(
    (selectSlot: any) => {
      console.log(' selectSlot ', selectSlot);
      setDayName(moment(selectSlot.start).format('dddd, MMMM Do'));
      setTimeStart(moment(selectSlot.start).format('LT'));
      setTimeEnd(moment(selectSlot.end).format('LT'));
      setTitle(selectSlot.title);
      setIsOpenFormEvent(!openFormEvent);
    },
    [openFormEvent]
  );

  // created event
  const [dayNameCreate, setDayNameCreate] = useState<string>('');
  const [timeStartCreate, setTimeStartCreate] = useState<string>('');
  const [timeEndCreate, setTimeEndCreate] = useState<string>('');

  const [startDatetime, setStartDatetime] = useState<Date | string>('');
  const [endDatetime, setEndDatetime] = useState<Date | string>('');

  // const [location, setLocation] = useState<string | null>('');

  // const [name, setName] = useState<string>('');

  // const [isValidDate, setIsValidDate] = useState<boolean>(false);

  function handleSelect(slotInfo: {
    start: stringOrDate;
    end: stringOrDate;
    slots: Date[] | string[];
    action: 'select' | 'click' | 'doubleClick';
  }) {
    const nowDate = moment(new Date());
    const eventDate = moment(slotInfo.start);

    if (nowDate > eventDate) {
      return;
    }

    setDayNameCreate(moment(slotInfo.start).format('dddd, MMMM Do'));
    setTimeStartCreate(moment(slotInfo.start).format('LT'));
    setTimeEndCreate(
      moment(slotInfo.start).add(moment.duration(1, 'hours')).format('LT')
    );
    setIsOpenFormEventCreate(!openFormEventCreate);

    setStartDatetime(moment(slotInfo.start).format());
    setEndDatetime(
      moment(slotInfo.start).add(moment.duration(1, 'hours')).format()
    );
  }

  const mutation = useMutation({
    mutationFn: async () => {
      setIsLoad(true);
      if (packageSchedule) {
        const response = await coachSchedulesApi.createSchedule({
          lesson_id: packageSchedule?.id,
          start_datetime: startDatetime,
          end_datetime: endDatetime,
        });
        return response;
      }
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['schedulesData'] });
      setIsLoad(false);
      setSuccess(true);
    },
    onError: (error: any) => {
      console.log(`POST create coach schedule error message ===> : ${error}`);
      setIsLoad(false);
      setSuccess(false);
      getErrorMessage(error, setError, 'schedules');
    },
  });

  const createSchedule = () => {
    mutation.mutate();
    setIsOpenFormEventCreate(false);
  };

  const mutationDelete = useMutation({
    mutationFn: async () => {
      setIsLoad(true);
      if (packageSchedule) {
        const response = await coachSchedulesApi.createSchedule({
          lesson_id: packageSchedule?.id,
          start_datetime: startDatetime,
          end_datetime: endDatetime,
        });

        console.log(' delete coach schedule ', response);
        return response;
      }
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['schedulesData'] });
      setIsLoad(false);
      // setSuccess(true);
    },
    onError: (error) => {
      console.log(`POST create coach schedule error message ===> : ${error}`);
      setIsLoad(false);
      // setSuccess(false);
      // getErrorMessage(error, setError, 'schedules');
    },
  });

  const scheduleDelete = () => {};

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(true);

  useEffect(() => {
    if (!modalIsOpen) {
      setTimeout(() => {
        setModalIsOpen(true);
        setError(null);
        setIsLoad(false);
      }, 1000);
    }
  }, [modalIsOpen, error]);

  const closeSuccessMessage = () => {
    setModalIsOpen(!modalIsOpen);
    setSuccess(false);
  };

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      {/* TODO: add in next step */}
      {/* <Box
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
      </Box> */}

      <Calendar
        localizer={localizer}
        events={myEvents}
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

      {/* TODO: must implement edit schedule  */}
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
                fontFamily: 'Inter, sens-serif',
                fontSize: '16px',
                fontWeight: 400,
                color: '#333333',
                mb: '20px',
              }}
            >
              {title}
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
                {/* <Box
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
                  onClick={scheduleDelete}
                >
                  Delete
                </Box> */}
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {openFormEventCreate && (
        <FormSchedule
          dayName={dayNameCreate}
          timeStart={timeStartCreate}
          timeEnd={timeEndCreate}
          packageSchedule={packageSchedule}
          packagesSchedule={packagesSchedule}
          setPackage={setPackage}
          openForm={() => setIsOpenFormEventCreate(!openFormEventCreate)}
          btnTitle={'Create'}
          handleClickSchedule={createSchedule}
        />
        // <Box
        //   sx={{
        //     width: '100vw',
        //     height: '100vh',
        //     display: 'flex',
        //     justifyContent: 'center',
        //     alignItems: 'center',
        //     position: 'fixed',
        //     top: 0,
        //     zIndex: 10000,
        //   }}
        // >
        //   <Box
        //     sx={{
        //       width: '396px',
        //       display: 'flex',
        //       justifyContent: 'flex-start',
        //       flexDirection: 'column',
        //       alignItems: 'flex-start',
        //       border: '1px solid #DBDBDB',
        //       boxShadow: '0px 2px 14px rgba(0, 0, 0, 0.12)',
        //       borderRadius: '14px',
        //       backgroundColor: '#FFFFFF',
        //       p: '32px',
        //     }}
        //   >
        //     <Box
        //       sx={{
        //         fontFamily: 'Inter, sens-serif',
        //         fontSize: '20px',
        //         fontWeight: 400,
        //         color: '#333333',
        //         borderBottom: '1px solid #333333',
        //         mb: '20px',
        //       }}
        //     >
        //       {dayNameCreate}
        //     </Box>
        //     <Box
        //       sx={{
        //         display: 'flex',
        //         justifyContent: 'center',
        //         alignItems: 'center',
        //         mb: '16px',
        //       }}
        //     >
        //       <Box
        //         sx={{
        //           fontFamily: 'Inter, sens-serif',
        //           fontSize: '14px',
        //           fontWeight: 400,
        //           color: '#333333',
        //           p: '8px',
        //           border: '1px solid #DEDEDD',
        //           borderRadius: '6px',
        //           mr: '5px',
        //         }}
        //       >
        //         {timeStartCreate}
        //       </Box>
        //       <Box sx={{ mr: '5px' }}> - </Box>
        //       <Box
        //         sx={{
        //           fontFamily: 'Inter, sens-serif',
        //           fontSize: '14px',
        //           fontWeight: 400,
        //           color: '#333333',
        //           p: '8px',
        //           border: '1px solid #DEDEDD',
        //           borderRadius: '6px',
        //         }}
        //       >
        //         {timeEndCreate}
        //       </Box>
        //     </Box>
        //     {/* <Box
        //       sx={{
        //         width: '100%',
        //         display: 'flex',
        //         justifyContent: 'center',
        //         flexDirection: 'column',
        //         alignItems: 'flex-start',
        //       }}
        //     >
        //       <Input
        //         name={'name'}
        //         label={'Title'}
        //         value={name}
        //         sx={{ ...nameInputStyles, width: '100%' }}
        //         onChange={(e) => setName(e.target.value)}
        //         type="text"
        //       />
        //     </Box> */}
        //     {/* <Box
        //       sx={{
        //         width: '100%',
        //         display: 'flex',
        //         justifyContent: 'center',
        //         flexDirection: 'column',
        //         alignItems: 'flex-start',
        //       }}
        //     >
        //       <Box
        //         sx={{
        //           fontFamily: 'Inter, sens-serif',
        //           fontSize: '12px',
        //           fontWeight: 400,
        //           textTransform: 'uppercase',
        //           color: '#9E9E9E',
        //           mb: '16px',
        //           mt: '16px',
        //         }}
        //       >
        //         Location
        //       </Box>
        //       <Autocomplete
        //         value={location}
        //         onChange={(event: any, newValue: string | null) => {
        //           setLocation(newValue);
        //         }}
        //         id="controllable-states-demo"
        //         options={[]}
        //         sx={{ ...nameInputStyles, width: '100%' }}
        //         renderInput={(params: any) => (
        //           <TextField {...params} label="Location" />
        //         )}
        //       />
        //     </Box> */}
        //     <Box
        //       sx={{
        //         width: '100%',
        //         display: 'flex',
        //         justifyContent: 'center',
        //         alignItems: 'flex-start',
        //         flexDirection: 'column',
        //       }}
        //     >
        //       <Box
        //         sx={{
        //           fontFamily: 'Inter, sens-serif',
        //           fontSize: '12px',
        //           fontWeight: 400,
        //           textTransform: 'uppercase',
        //           color: '#9E9E9E',
        //           mb: '16px',
        //           mt: '16px',
        //         }}
        //       >
        //         Package
        //       </Box>
        //       <Autocomplete
        //         value={packageSchedule}
        //         onChange={(event: any, newValue: string | null) => {
        //           setPackage(newValue);
        //         }}
        //         id="controllable-states-demo"
        //         options={[]}
        //         sx={{ ...nameInputStyles, width: '100%' }}
        //         renderInput={(params: any) => (
        //           <TextField {...params} label="Package" />
        //         )}
        //       />
        //     </Box>
        //     <Box
        //       sx={{
        //         display: 'flex',
        //         justifyContent: 'center',
        //         alignItems: 'flex-start',
        //         flexDirection: 'column',
        //       }}
        //     >
        //       {/* <Box
        //         sx={{
        //           fontFamily: 'Inter, sens-serif',
        //           fontSize: '12px',
        //           fontWeight: 400,
        //           textTransform: 'uppercase',
        //           color: '#9E9E9E',
        //           mb: '16px',
        //           mt: '16px',
        //         }}
        //       >
        //         Repetition
        //       </Box> */}
        //       {/* <FormControl>
        //         <RadioGroup
        //           aria-labelledby="demo-radio-buttons-group-label"
        //           defaultValue="repeats_weekly"
        //           name="radio-buttons-group"
        //         >
        //           <FormControlLabel
        //             value="repeats_weekly"
        //             control={<Radio />}
        //             label="Repeats weekly"
        //           />
        //           <FormControlLabel
        //             value="repeats_monthly"
        //             control={<Radio />}
        //             label="Repeats monthly"
        //           />
        //           <FormControlLabel
        //             value="does_not_repeat"
        //             control={<Radio />}
        //             label="Does not repeat"
        //           />
        //         </RadioGroup>
        //       </FormControl> */}
        //     </Box>

        //     <Box sx={{ mt: '36px', width: '100%' }}>
        //       <Box sx={{ width: '100%', border: '1px solid #DBDBDB' }} />
        //       <Box
        //         sx={{
        //           mt: '16px',
        //           display: 'flex',
        //           justifyContent: 'flex-end',
        //           alignItems: 'flex-end',
        //         }}
        //       >
        //         <Box
        //           sx={{
        //             cursor: 'pointer',
        //             display: 'flex',
        //             justifyContent: 'center',
        //             alignItems: 'center',
        //             width: '64px',
        //             height: '32px',
        //             fontFamily: 'Inter, sens-serif',
        //             fontSize: '14px',
        //             fontWeight: 500,
        //             color: '#333333',
        //             transition: 'easeOut 0.3s all',
        //             '&:hover': {
        //               color: '#F05547',
        //               transition: 'easeOut 0.3s all',
        //             },
        //           }}
        //           onClick={() => setIsOpenFormEventCreate(!openFormEventCreate)}
        //         >
        //           Cancel
        //         </Box>
        //         <Box
        //           sx={{
        //             cursor: 'pointer',
        //             display: 'flex',
        //             justifyContent: 'center',
        //             alignItems: 'center',
        //             width: '64px',
        //             height: '32px',
        //             fontFamily: 'Inter, sens-serif',
        //             fontSize: '14px',
        //             fontWeight: 500,
        //             color: '#ffffff',
        //             backgroundColor: '#F05547',
        //             borderRadius: '6px',
        //             transition: 'easeOut 0.3s all',
        //             '&:hover': {
        //               boxShadow: '0px 0px 5px #F05547',
        //               transition: 'easeOut 0.3s all',
        //             },
        //           }}
        //         >
        //           Create
        //         </Box>
        //       </Box>
        //     </Box>
        //   </Box>
        // </Box>
      )}

      {isLoad && (
        <CustomModel isOpen={isLoad}>
          <Loader />
        </CustomModel>
      )}
      {error && !isSuccess && (
        <CustomModel
          isOpen={modalIsOpen}
          handleClick={() => setModalIsOpen(!modalIsOpen)}
        >
          <MessageBox
            message={error}
            handleClick={() => setModalIsOpen(!modalIsOpen)}
          />
        </CustomModel>
      )}
      {isSuccess && (
        <CustomModel isOpen={modalIsOpen} handleClick={closeSuccessMessage}>
          <MessageBox
            message={'Schedule created successfully'}
            handleClick={closeSuccessMessage}
          />
        </CustomModel>
      )}
    </Box>
  );
};

export default MyCalendar;
