import { bayesSentiment } from '@matteocacciola/naive-bayes-sentiment-classifier';
import { Strategy } from './interfaces';
import { ScoreStrategyType, SENTIMENTS, SentimentsType } from './types';

const strategy: Strategy = {
  async evaluateScores(items: string[]): Promise<ScoreStrategyType[]> {
    return Promise.all(items.map(item => {
      if (!item) {
        return { category: SENTIMENTS.undefined as unknown as SentimentsType };
      }

      const { sentiment: category, probability } = bayesSentiment(item);

      return { probability, category: category as SentimentsType };
    }));
  },
};

export default strategy;
