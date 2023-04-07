/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Coach } from './Coach';
import type { Location } from './Location';
import type { SportType } from './SportType';

export type Lesson = {
    title?: string;
    location: Location;
    sport: SportType;
    price: number;
    max_people?: number;
    about?: string;
    uuid: string;
    id: number;
    coach: Coach;
};

