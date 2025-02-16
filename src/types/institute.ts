import { Program } from './program.ts';
import { Status } from './status.ts';

export type Institute = {
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
  logo?: File;
  status: Status;
  programs?: Program[];
};
