import { Subject } from './subject.ts';
import { Level } from '../enums/level.ts';
import { Language } from '../enums/language.ts';

export type Program = {
  id?: number;
  name: string;
  description?: string;
  level: Level;
  durationInDays: number;
  studentCount: number;
  language: Language;
  batchId?: string;
  payment: number;
  instituteId?: number;
  subjects?: Subject[];
};
