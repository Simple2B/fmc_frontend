/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Location } from './Location';
import type { SportType } from './SportType';

export type BaseLesson = {
    title?: string;
    location: Location;
    sport: SportType;
    price: number;
    max_people?: number;
    about?: string;
};

