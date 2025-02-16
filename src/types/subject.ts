export type Subject = {
  id: number;
  name: string;
  noOfCredits: number;
  description?: string;
  isAssigned: boolean;
  lecturerId?: number;
};
