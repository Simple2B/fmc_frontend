/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Product } from '../models/Product';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class StripeService {

    /**
     * Get Coach Stripe Product
     * @returns Product Successful Response
     * @throws ApiError
     */
    public static apiGetCoachStripeProduct(): CancelablePromise<Product> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/stripe/coach/products',
        });
    }

    /**
     * Reserve Booking
     * @param scheduleUuids
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiReserveBooking(
        scheduleUuids?: Array<string>,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/stripe/student/reserve',
            query: {
                'schedule_uuids': scheduleUuids,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Stripe Webhook
     * @param stripeSignature
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiStripeWebhook(
        stripeSignature?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/stripe/webhook',
            headers: {
                'stripe-signature': stripeSignature,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
