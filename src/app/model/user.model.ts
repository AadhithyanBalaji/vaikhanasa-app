import { AddressInfo } from './address-info.model';

export class User {
  firstName!: string;
  lastName!: string;
  dob!: Date;
  clanId!: number;
  relationShipStatus!: number;

  userName!: string;
  password!: string;

  address!: AddressInfo;
  contactNumber!: string;
  phoneNumber!: string;
}
