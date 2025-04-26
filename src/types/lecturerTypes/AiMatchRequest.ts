export type AiMatchRequest = {
  program?: string;
  hourly_pay: number;
  level: string;
  time_pref?: string;
  studentCount: number;
  subject: string;
  noOfCredits: number;
  instituteRating?: number;
  duration: number;
  division?: string;
  status?: string;
  language: string;
};