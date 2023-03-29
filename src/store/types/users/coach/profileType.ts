/* eslint-disable no-unused-vars */
import { IUserProfile } from '../../user';

export interface ILocation {
  city: string;
  street: string;
  postal_code: string;
}

export interface ISport {
  uuid: string;
  name: string;
}

export interface ISportInput {
  id: string;
  label: string;
}

export interface ICertificates {
  certificate_url?: string;
  created_at?: Date;
}

export interface ICoachDetailProfile extends IUserProfile {
  about: string;
  certificate_url: ICertificates[];
  is_for_adults: boolean;
  is_for_children: boolean;
  sports: ISport[] | null;
}

export interface IYourProfile {
  about: string;
  certificates: {
    certificate_url: string;
    created_at: string;
    is_deleted: boolean;
  }[];
  email: string;
  first_name: string;
  is_for_adults: boolean;
  is_for_children: boolean;
  is_verified: boolean;
  last_name: string;
  locations: { city: string; street: string; postal_code: string }[];
  profile_picture: string;
  sports: { name: string; uuid: string }[];
  username: string;
  uuid: string;
}

interface IPrice {
  stripe_price_id: string;
  currency: string;
  created: number;
  unit_amount: number;
}

interface IProduct {
  stripe_product_id: string;
  name: string;
  description: string;
  created: number;
  price: IPrice;
}

export interface ICoachSubscription {
  product: IProduct;
  stripe_subscription_id: string;
  current_period_end: string;
  current_period_start: string;
  created: string;
  status: string;
  is_active: boolean;
}

export enum SubscriptionCheckState {
  PENDING,
  ACTIVE,
  CANCELLED,
}
