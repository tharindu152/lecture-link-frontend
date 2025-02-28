import { Lecturer } from './lecturer.ts';

export type LecturerRes = Omit<Lecturer, 'picture'> & {
  picture?: string;
};
