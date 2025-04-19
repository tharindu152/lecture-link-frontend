import { Program } from './program.ts';
import { Status } from '../enums/status.ts';

export type Institute = {
  id?: number;
  name: string;
  password: string;
  email: string;
  district: string;
  telephone?: string;
  mapsLocation: string;
  ugcRegNo?: string;
  description?: string;
  currentRating?: number;
  subscribed?: boolean;
  logo?: File;
  status: Status;
  programs?: Program[];
};
