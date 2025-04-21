export type AiMatchResponseDto = {
  predictedLecturerId: number;
  top3Recommendations: Recommendation[];
};

export type Recommendation = {
  lecturer_id: number;
  probability: number;
};