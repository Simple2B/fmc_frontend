/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NewsletterSubscription } from '../models/NewsletterSubscription';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class NewsletterService {

    /**
     * Send Contact Request
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiSendContactRequest(
        requestBody: NewsletterSubscription,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/newsletter/subscribe',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
