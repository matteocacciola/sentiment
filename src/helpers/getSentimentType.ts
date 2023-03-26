import { SENTIMENTS, SentimentsType } from '../types';
import { CONFIG } from '../constants';

export const getSentimentType = (score: number): SentimentsType => {
  const threshold = CONFIG.SCORE_THRESHOLD;

  if (score < -threshold) {
    return SENTIMENTS.negative as unknown as SentimentsType;
  }

  if (score > threshold) {
    return SENTIMENTS.positive as unknown as SentimentsType;
  }

  return SENTIMENTS.neutral as unknown as SentimentsType;
};
