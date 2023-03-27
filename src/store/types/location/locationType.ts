/* eslint-disable no-unused-vars */
export interface ILocation {
  name: string | null;
  city: string | null;
  street: string | null;
  postal_code: string | null;
}

export enum TypeLocation {
  city = 'city',
  street = 'street',
  postal_code = 'postal_code',
}
