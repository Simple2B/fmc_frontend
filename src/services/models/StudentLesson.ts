/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Coach } from './Coach';
import type { Schedule } from './Schedule';
import type { User } from './User';

export type StudentLesson = {
    uuid: string;
    student_id: number;
    schedule_id: number;
    coach_id: number;
    student: User;
    schedule: Schedule;
    coach: Coach;
    appointment_time: string;
    created_at: string;
};

