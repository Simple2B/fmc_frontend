/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Certificate } from './Certificate';
import type { Location } from './Location';
import type { Review } from './Review';
import type { SportType } from './SportType';

export type Coach = {
    uuid?: string;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    is_verified: boolean;
    profile_picture?: string;
    stripe_account_id?: string;
    total_rate: number;
    about?: string;
    is_for_adults: boolean;
    is_for_children: boolean;
    locations: Array<Location>;
    certificates: Array<Certificate>;
    sports: Array<SportType>;
    reviews: Array<Review>;
};

