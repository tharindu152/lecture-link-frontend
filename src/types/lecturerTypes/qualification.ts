import { Level } from '../enums/level.ts';

export type Qualification = {
  id?: number;
  name: string;
  awardingBody: string;
  durationInDays: number;
  discipline?: string;
  completedAt: string;
  level: Level;
  lecturerId: number;
};
