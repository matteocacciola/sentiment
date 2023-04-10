import { SentimentType, SENTIMENTS } from '../types';

export const getSentimentType = (score: number, threshold: number): SentimentType => {
  if (score <= -threshold) {
    return SENTIMENTS.negative as unknown as SentimentType;
  }

  if (score >= threshold) {
    return SENTIMENTS.positive as unknown as SentimentType;
  }

  return SENTIMENTS.neutral as unknown as SentimentType;
};
