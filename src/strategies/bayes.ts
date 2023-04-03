import { bayesSentiment } from '@matteocacciola/naive-bayes-sentiment-classifier';
import { Strategy } from './interfaces';
import { BayesStrategyOptions, ScoreStrategyOptions, ScoreStrategyType, SENTIMENTS, SentimentsType } from './types';

const strategy: Strategy = {
  async evaluateScores(
    items: string[],
    scoreThreshold: number,
    strategyOptions?: ScoreStrategyOptions,
  ): Promise<ScoreStrategyType[]> {
    return Promise.all(items.map(item => {
      if (!item) {
        return { category: SENTIMENTS.undefined as unknown as SentimentsType };
      }

      const { sentiment: category, probability } = bayesSentiment(
        item,
        (strategyOptions as BayesStrategyOptions)?.positivePath,
        (strategyOptions as BayesStrategyOptions)?.negativePath,
      );

      // probability is within [0, 1]
      return { probability, category: category as SentimentsType };
    }));
  },
};

export default strategy;
