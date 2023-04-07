/* eslint-disable no-unused-vars */
export interface ILocation {
  id?: number;
  uuid?: string;
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

export interface ILocationUI {
  city: {
    name: string;
    isError: boolean;
    messageError: string;
  };
  street: {
    name: string;
    isError: boolean;
    messageError: string;
  };
  postal_code: {
    name: string;
    isError: boolean;
    messageError: string;
  };
  icon?: any;
}
