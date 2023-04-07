/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UnreviewedLessonsList } from '../models/UnreviewedLessonsList';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class NotificationService {

    /**
     * Get Review Notifications
     * @returns UnreviewedLessonsList Successful Response
     * @throws ApiError
     */
    public static apiGetReviewNotifications(): CancelablePromise<UnreviewedLessonsList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/notification/student/reviews',
        });
    }

}
