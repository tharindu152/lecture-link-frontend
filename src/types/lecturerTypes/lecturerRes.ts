import { Lecturer } from './lecturer.ts';
import { Subject } from '../instituteTypes/subject.ts';

export type LecturerRes = Omit<Lecturer, 'picture'> & {
  picture?: string;
  subjects?: Subject[];
};
