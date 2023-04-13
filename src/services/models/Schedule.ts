/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Coach } from './Coach';
import type { Lesson } from './Lesson';

export type Schedule = {
    lesson_id: number;
    start_datetime: string;
    end_datetime: string;
    id: number;
    uuid: string;
    lesson: Lesson;
    coach_id: number;
    coach: Coach;
    reccurence?: number;
    is_booked: boolean;
};

