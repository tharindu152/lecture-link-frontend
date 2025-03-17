import { Status } from '../enums/status.ts';
import { Qualification } from './qualification.ts';
import { Language } from '../enums/language.ts';

export type Lecturer = {
  id?: number;
  name: string;
  district: string;
  email: string;
  password: string;
  dob?: string;
  contactNo?: string;
  language?: Language;
  rating?: number;
  subscribed?: boolean;
  payRate?: number;
  preference?: string;
  picture?: File;
  status: Status;
  isAssigned?: boolean;
  languages?: string;
  qualifications?: Qualification[];
};
