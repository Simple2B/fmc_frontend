import { ILocation } from '../location/locationType';
import { ISport, IYourProfile } from '../users/coach/profileType';

export interface IPackage {
  title: string;
  location: ILocation;
  sport: ISport;
  price: number;
  max_people: number;
  about: string | null;
}

export interface IBasePackage extends IPackage {
  uuid: string;
  id: number;
  coach: IYourProfile;
}

export interface IPackageSchedule {
  uuid: string;
  id: number;
  title: string;
  location: ILocation;
  sport: ISport;
  price: number;
  max_people: number;
  about: string | null;
  coach: IYourProfile;
}
