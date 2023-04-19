/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type User = {
    uuid?: string;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    is_verified: boolean;
    profile_picture?: string;
    stripe_account_id?: string;
};

