import { Subject } from './subject.ts';

export type FilteredSubjectRes = Omit<Subject, 'description' | 'isAssigned' | 'lecturerId'> & {
  level: string;
  durationInDays: number;
  studentCount: number;
  district: string;
  payment: number;
};
