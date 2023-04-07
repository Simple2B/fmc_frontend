export interface ISchedule {
  lesson_id?: number;
  coach_id?: number;
  start_datetime: Date | string;
  end_datetime: Date | string;
}
