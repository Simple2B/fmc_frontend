/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseSchedule } from '../models/BaseSchedule';
import type { Schedule } from '../models/Schedule';
import type { ScheduleList } from '../models/ScheduleList';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CoachScheduleService {

    /**
     * Get Current Coach Schedules
     * @returns ScheduleList Successful Response
     * @throws ApiError
     */
    public static apiGetCurrentCoachSchedules(): CancelablePromise<ScheduleList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/schedule/schedules',
        });
    }

    /**
     * Create Coach Schedule
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiCreateCoachSchedule(
        requestBody: BaseSchedule,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/schedule/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Schedule By Uuid
     * @param scheduleUuid
     * @returns Schedule Successful Response
     * @throws ApiError
     */
    public static apiGetScheduleByUuid(
        scheduleUuid: string,
    ): CancelablePromise<Schedule> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/schedule/{schedule_uuid}',
            path: {
                'schedule_uuid': scheduleUuid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Schedule By Uuid
     * @param scheduleUuid
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiDeleteScheduleByUuid(
        scheduleUuid: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/schedule/{schedule_uuid}',
            path: {
                'schedule_uuid': scheduleUuid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
