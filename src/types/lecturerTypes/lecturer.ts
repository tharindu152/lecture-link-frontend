import { Status } from '../enums/status.ts';
import { Qualification } from './qualification.ts';
import { Language } from '../enums/language.ts';
import { Program } from '../instituteTypes/program.ts';

export type Lecturer = {
  id?: number;
  name: string;
  division: string;
  email: string;
  password: string;
  dob?: string;
  contactNo?: string;
  language?: Language;
  currentRating?: number;
  subscribed?: boolean;
  hourlyPayRate?: number;
  lecturingExperience?: number;
  fieldOfWork?: string;
  mapsLocation?: string;
  timePreference: string;
  preference?: string;
  picture?: File;
  status: Status;
  isAssigned?: boolean;
  languages?: string;
  qualifications?: Qualification[];
  programs?: Program[];
};
