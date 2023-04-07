export interface ICalendarState {
  selectedDate: Date;
}

export enum CalendarAction {
  // eslint-disable-next-line no-unused-vars
  CALENDAR_SET_SELECTED_DATE = 'CALENDAR_SET_SELECTED_DATE',
}

type ISetSelectedDate = {
  type: CalendarAction.CALENDAR_SET_SELECTED_DATE;
  payload: Date;
};

const calendarState: ICalendarState = {
  selectedDate: new Date(),
};

export const calendarReducer = (
  state = calendarState,
  action: ISetSelectedDate
) => {
  switch (action.type) {
    case CalendarAction.CALENDAR_SET_SELECTED_DATE:
      return {
        ...state,
        selectedDate: action.payload,
      };
    default:
      return state;
  }
};
