/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Coach } from './Coach';
import type { Lesson } from './Lesson';

export type Schedule = {
    uuid: string;
    lesson_id: number;
    lesson: Lesson;
    coach_id: number;
    coach: Coach;
    reccurence: number;
};

