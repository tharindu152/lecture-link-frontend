export type AiMatchResponseDto = {
  predictedLecturerId: number;
  top3Recommendations: Recommendation[];
};

export type Recommendation = {
  lecturerId: number;
  probability: number;
};