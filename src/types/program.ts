import { Subject } from './subject.ts';
import { Level } from './level.ts';

export type Program = {
  id: number;
  name: string;
  description?: string;
  level: Level;
  durationInDays: number;
  studentCount: number;
  batchId?: string;
  payment: number;
  instituteId: number;
  subjects?: Subject[];
};
