export type AiMatchRequest = {
  program?: string;
  hourlyPay: number;
  level: 'DOCTORATE' | 'MASTERS' | 'POSTGRADUATE' | 'BACHELORS' | 'HND' | 'HNC';
  timePreference?: 'WEEKEND' | 'WEEKDAY' | 'FLEXIBLE';
  studentCount: number;
  subject: string;
  noOfCredits: number;
  instituteRating?: number;
};