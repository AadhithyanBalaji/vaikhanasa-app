import { AddressInfo } from './address-info.model';

export class User {
  firstName!: string;
  lastName!: string;
  dob!: Date;
  gender!: number;
  clanId!: number;
  relationShipStatus!: number;

  userName!: string;
  password!: string;

  address!: AddressInfo;
  contactNumber!: string;
  phoneNumber!: string;

  isActive!: boolean;
  isAdmin: boolean = false;
}
