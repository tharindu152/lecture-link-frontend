import { LecturerRes } from './lecturerRes.ts';

export type FilteredLecturersResponse = {
  lecturers: LecturerRes[];
  total: number;
};