export type AiMatchRequest = {
  program?: string;
  hourlyPay: number;
  level: string;
  time_pref?: string;
  studentCount: number;
  subject: string;
  noOfCredits: number;
  instituteRating?: number;
};