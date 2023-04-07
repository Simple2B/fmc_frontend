/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Scheme for validating user`s sign in via Google OAuth data
 */
export type UserGoogleLogin = {
    uuid?: string;
    email: string;
    username: string;
    google_openid_key: string;
    picture?: string;
};

