export interface ISchedule {
  location_id: number;
  week_day: number;
  begin_hours: number;
  begin_minutes: number;
  duration?: number;
}
