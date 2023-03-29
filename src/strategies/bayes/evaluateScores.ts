import { ScoreStrategyType, SENTIMENTS, SentimentsType } from '../../types';
import { bayesSentiment } from '@matteocacciola/naive-bayes-sentiment-classifier';

export const evaluateScores = async (company: string, items: string[]): Promise<ScoreStrategyType[]> => {
  return Promise.all(items.map(item => {
    if (!item) {
      return { category: SENTIMENTS.undefined as unknown as SentimentsType };
    }

    const { sentiment: category, probability } = bayesSentiment(item);

    return { probability, category: category as SentimentsType };
  }));
};
