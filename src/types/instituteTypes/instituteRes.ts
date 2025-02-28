import { Institute } from './institute.ts';

export type InstituteRes = Omit<Institute, 'logo'> & {
  logo?: string;
};
