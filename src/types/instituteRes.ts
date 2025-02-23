import { Program } from './program.ts';
import { Status } from './status.ts';

export type InstituteRes = {
  id: number;
  name: string;
  password: string;
  email: string;
  district: string;
  telephone?: string;
  ugcRegNo?: string;
  description?: string;
  review?: string;
  subscribed: boolean;
  logo?: string;
  status: Status;
  programs?: Program[];
};
