/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseReview } from '../models/BaseReview';
import type { ReviewList } from '../models/ReviewList';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ReviewsService {

    /**
     * Create Review
     * @param lessonUuid
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiCreateReview(
        lessonUuid: string,
        requestBody: BaseReview,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/review/{lesson_uuid}',
            path: {
                'lesson_uuid': lessonUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Coach Reviews List
     * @returns ReviewList Successful Response
     * @throws ApiError
     */
    public static apiCoachReviewsList(): CancelablePromise<ReviewList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/review/reviews',
        });
    }

    /**
     * Get Reviews By Coach Uuid
     * @param coachUuid
     * @returns ReviewList Successful Response
     * @throws ApiError
     */
    public static apiGetReviewsByCoachUuid(
        coachUuid: string,
    ): CancelablePromise<ReviewList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/review/reviews/{coach_uuid}',
            path: {
                'coach_uuid': coachUuid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
