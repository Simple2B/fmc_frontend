/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseUser } from '../models/BaseUser';
import type { Body_API_student_login } from '../models/Body_API_student_login';
import type { Token } from '../models/Token';
import type { UserGoogleLogin } from '../models/UserGoogleLogin';
import type { UserResetPasswordIn } from '../models/UserResetPasswordIn';
import type { UserSignUp } from '../models/UserSignUp';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class StudentAuthenticationService {

    /**
     * Student Login
     * @param formData
     * @returns Token Successful Response
     * @throws ApiError
     */
    public static apiStudentLogin(
        formData: Body_API_student_login,
    ): CancelablePromise<Token> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/student/login',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Student Sign Up
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiStudentSignUp(
        requestBody: UserSignUp,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/student/sign-up',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Student Account Confirmation
     * @param token
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiStudentAccountConfirmation(
        token: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/student/account-confirmation/{token}',
            path: {
                'token': token,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Forgot Password Student
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiForgotPasswordStudent(
        requestBody: BaseUser,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/student/forgot-password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Student Reset Password
     * @param verificationToken
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiStudentResetPassword(
        verificationToken: string,
        requestBody: UserResetPasswordIn,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/student/reset-password/{verification_token}',
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
     * Student Google Auth
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiStudentGoogleAuth(
        requestBody: UserGoogleLogin,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/student/google-oauth',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
