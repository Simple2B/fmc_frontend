/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListSportType } from '../models/ListSportType';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SportsService {

    /**
     * Get Sports
     * @returns ListSportType Successful Response
     * @throws ApiError
     */
    public static apiGetSports(): CancelablePromise<ListSportType> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/sports/types',
        });
    }

}
