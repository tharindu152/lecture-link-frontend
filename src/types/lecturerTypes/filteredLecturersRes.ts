import { LecturerRes } from './lecturerRes.ts';

export type FilteredLecturersRes = {
  lecturers: LecturerRes[];
  total: number;
};