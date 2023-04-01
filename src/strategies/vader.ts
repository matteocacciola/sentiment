import { Strategy } from './interfaces';
import { ScoreStrategyType, SENTIMENTS, SentimentsType } from './types';
import { getSentimentType } from './helpers/getSentimentType';

const vader = require('vader-sentiment');

const strategy: Strategy = {
  async evaluateScores(
    items: string[],
    scoreThreshold: number,
  ): Promise<ScoreStrategyType[]> {
    return Promise.all(items.map(item => {
      if (!item) {
        return { category: SENTIMENTS.undefined as unknown as SentimentsType };
      }

      // compund is already within [-1, 1]
      const { compound: score } = vader.SentimentIntensityAnalyzer.polarity_scores(item);

      return { score, category: getSentimentType(score, scoreThreshold) };
    }));
  },
};

export default strategy;
