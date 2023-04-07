/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GAPIKeysSchema } from '../models/GAPIKeysSchema';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class KeysService {

    /**
     * Get Gapi Keys
     * @returns GAPIKeysSchema Successful Response
     * @throws ApiError
     */
    public static apiGetGapiKeys(): CancelablePromise<GAPIKeysSchema> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/keys/google',
        });
    }

}
