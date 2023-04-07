/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ContactDataIn } from '../models/ContactDataIn';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ContactService {

    /**
     * Send Contact Request
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiSendContactRequest(
        requestBody: ContactDataIn,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/contact/question',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
