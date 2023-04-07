/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CoachList } from '../models/CoachList';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LikeService {

    /**
     * Like Coach
     * @param coachUuid
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiLikeCoach(
        coachUuid: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/like/coach/{coach_uuid}',
            path: {
                'coach_uuid': coachUuid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Unlike Coach
     * @param coachUuid
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiUnlikeCoach(
        coachUuid: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/like/coach/unlike/{coach_uuid}',
            path: {
                'coach_uuid': coachUuid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * List Liked Coached
     * @returns CoachList Successful Response
     * @throws ApiError
     */
    public static apiListLikedCoached(): CancelablePromise<CoachList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/like/student/favourites',
        });
    }

}
