import { Status } from './status.ts';

export type lecturer = {
  id: number;
  name: string;
  district: string;
  email: string;
  password: string;
  dob: string;
  contactNo?: string;
  review?: string;
  payRate: number;
  preference?: string;
  picture?: File;
  status: Status;
  isAssigned: boolean;
  languages?: string;
};
