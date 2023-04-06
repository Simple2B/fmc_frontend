import { ILocation } from '../location/locationType';
import { ISport } from '../users/coach/profileType';

export interface IPackage {
  title: string;
  location: ILocation;
  sport: ISport;
  price: number;
  max_people: number;
  about: string | null;
}
