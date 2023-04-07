/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Price } from './Price';

export type Product = {
    stripe_product_id: string;
    name: string;
    description: string;
    created: number;
    price: Price;
};

