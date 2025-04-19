import { Subject } from './subject.ts';
import { Level } from '../enums/level.ts';
import { Language } from '../enums/language.ts';
import { PrefferedTimeSlot } from '../enums/prefferedTimeSlot.ts';

export type Program = {
  id?: number;
  name: string;
  description?: string;
  level: Level;
  timePreference:  PrefferedTimeSlot,
  durationInDays: number;
  studentCount: number;
  language: Language;
  batchId?: string;
  hourlyPayRate: number;
  instituteId?: number;
  subjects?: Subject[];
};
