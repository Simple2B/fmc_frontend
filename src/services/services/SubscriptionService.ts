/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CheckoutSession } from '../models/CheckoutSession';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SubscriptionService {

    /**
     * Create Coach Subscription
     * @returns CheckoutSession Successful Response
     * @throws ApiError
     */
    public static apiCreateCoachSubscription(): CancelablePromise<CheckoutSession> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/subscription/coach/create',
        });
    }

}
