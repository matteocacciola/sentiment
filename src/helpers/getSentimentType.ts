import { SENTIMENTS, SentimentsType } from '../types';

export const getSentimentType = (score: number, threshold: number): SentimentsType => {
  if (score <= -threshold) {
    return SENTIMENTS.negative as unknown as SentimentsType;
  }

  if (score >= threshold) {
    return SENTIMENTS.positive as unknown as SentimentsType;
  }

  return SENTIMENTS.neutral as unknown as SentimentsType;
};
