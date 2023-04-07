/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Product } from './Product';

export type Subscription = {
    product: Product;
    stripe_subscription_id: string;
    current_period_end: number;
    current_period_start: number;
    created: number;
    status: string;
    is_active: boolean;
};

