/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseLesson } from '../models/BaseLesson';
import type { Lesson } from '../models/Lesson';
import type { LessonList } from '../models/LessonList';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PackagesService {

    /**
     * Create Package
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiCreatePackage(
        requestBody: BaseLesson,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/package/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Packages
     * @returns LessonList Successful Response
     * @throws ApiError
     */
    public static apiGetPackages(): CancelablePromise<LessonList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/package/packages',
        });
    }

    /**
     * Get Package
     * @param packageUuid
     * @returns Lesson Successful Response
     * @throws ApiError
     */
    public static apiGetPackage(
        packageUuid: string,
    ): CancelablePromise<Lesson> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/package/{package_uuid}',
            path: {
                'package_uuid': packageUuid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
