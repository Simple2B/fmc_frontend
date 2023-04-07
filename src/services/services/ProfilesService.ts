/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_API_update_coach_personal_info } from '../models/Body_API_update_coach_personal_info';
import type { Body_API_update_coach_profile } from '../models/Body_API_update_coach_profile';
import type { Body_API_update_student_personal_info } from '../models/Body_API_update_student_personal_info';
import type { Coach } from '../models/Coach';
import type { CoachList } from '../models/CoachList';
import type { ListSportType } from '../models/ListSportType';
import type { LocationList } from '../models/LocationList';
import type { ProfileChangePasswordIn } from '../models/ProfileChangePasswordIn';
import type { Subscription } from '../models/Subscription';
import type { User } from '../models/User';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProfilesService {

    /**
     * Get Info Coach Profile
     * @returns Coach Successful Response
     * @throws ApiError
     */
    public static apiGetInfoCoachProfile(): CancelablePromise<Coach> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/profile/info/coach',
        });
    }

    /**
     * Get Coach Profile
     * @returns User Successful Response
     * @throws ApiError
     */
    public static apiGetCoachProfile(): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/profile/coach',
        });
    }

    /**
     * Get Coach By Uuid
     * @param coachUuid
     * @returns Coach Successful Response
     * @throws ApiError
     */
    public static apiGetCoachByUuid(
        coachUuid: string,
    ): CancelablePromise<Coach> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/profile/coach/{coach_uuid}',
            path: {
                'coach_uuid': coachUuid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Student Profile
     * @returns User Successful Response
     * @throws ApiError
     */
    public static apiGetStudentProfile(): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/profile/student',
        });
    }

    /**
     * Get Coach Subscription
     * @returns Subscription Successful Response
     * @throws ApiError
     */
    public static apiGetCoachSubscription(): CancelablePromise<Subscription> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/profile/coach/subscription/info',
        });
    }

    /**
     * Update Coach Personal Info
     * @param formData
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiUpdateCoachPersonalInfo(
        formData: Body_API_update_coach_personal_info,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/profile/coach/personal-info',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Student Personal Info
     * @param formData
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiUpdateStudentPersonalInfo(
        formData: Body_API_update_student_personal_info,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/profile/student/personal-info',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Coach Profile
     * @param formData
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiUpdateCoachProfile(
        formData?: Body_API_update_coach_profile,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/profile/coach/profile-info',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Coach Change Password
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiCoachChangePassword(
        requestBody: ProfileChangePasswordIn,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/profile/coach/change-password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Student Change Password
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiStudentChangePassword(
        requestBody: ProfileChangePasswordIn,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/profile/student/change-password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Coach Cards
     * Returns all cards for UNauthorized user
     * @param name
     * @param sportIds
     * @param address
     * @returns CoachList Successful Response
     * @throws ApiError
     */
    public static apiGetCoachCards(
        name?: string,
        sportIds?: Array<number>,
        address?: string,
    ): CancelablePromise<CoachList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/profile/profiles/search/cards',
            query: {
                'name': name,
                'sport_ids': sportIds,
                'address': address,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Coach Locations
     * @returns LocationList Successful Response
     * @throws ApiError
     */
    public static apiCoachLocations(): CancelablePromise<LocationList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/profile/coach/locations/info',
        });
    }

    /**
     * Coach Sports
     * @returns ListSportType Successful Response
     * @throws ApiError
     */
    public static apiCoachSports(): CancelablePromise<ListSportType> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/profile/coach/sports/info',
        });
    }

}
