import { Status } from './status.ts';
import { Qualification } from './qualification.ts';
import { Subject } from './subject.ts';

export type LecturerRes = {
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
  picture?: string;
  status: Status;
  isAssigned: boolean;
  languages?: string;
  qualifications?: Qualification[];
  subjects?: Subject[];
};
