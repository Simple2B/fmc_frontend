/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseUser } from '../models/BaseUser';
import type { Body_API_coach_login } from '../models/Body_API_coach_login';
import type { Token } from '../models/Token';
import type { UserGoogleLogin } from '../models/UserGoogleLogin';
import type { UserResetPasswordIn } from '../models/UserResetPasswordIn';
import type { UserSignUp } from '../models/UserSignUp';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CoachAuthenticationService {

    /**
     * Coach Login
     * @param formData
     * @returns Token Successful Response
     * @throws ApiError
     */
    public static apiCoachLogin(
        formData: Body_API_coach_login,
    ): CancelablePromise<Token> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/coach/login',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Coach Sign Up
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiCoachSignUp(
        requestBody: UserSignUp,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/coach/sign-up',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Coach Account Confirmation
     * @param token
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiCoachAccountConfirmation(
        token: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/coach/account-confirmation/{token}',
            path: {
                'token': token,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Forgot Password
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiForgotPassword(
        requestBody: BaseUser,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/coach/forgot-password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Coach Reset Password
     * @param verificationToken
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiCoachResetPassword(
        verificationToken: string,
        requestBody: UserResetPasswordIn,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/coach/reset-password/{verification_token}',
            path: {
                'verification_token': verificationToken,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Coach Google Auth
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiCoachGoogleAuth(
        requestBody: UserGoogleLogin,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/coach/google-oauth',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
