/* eslint-disable no-unused-vars */
import {
  CalendarAction,
  ICalendarState,
  calendarReducer,
} from '@/reducers/calendarReducer';
import { PropsWithChildren, createContext, useReducer } from 'react';

interface ICalendarContext {
  calendarState: ICalendarState;
  setSelectedDate: (date: Date) => void;
}

export const CalendarContext = createContext<ICalendarContext>({
  calendarState: {
    selectedDate: new Date(),
  },
  setSelectedDate: () => {},
});

export const CalendarProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(calendarReducer, {
    selectedDate: new Date(),
  });

  const value: ICalendarContext = {
    calendarState: state,
    setSelectedDate: (date: Date) => {
      dispatch({
        type: CalendarAction.CALENDAR_SET_SELECTED_DATE,
        payload: date,
      });
    },
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};
