import { Strategy } from './interfaces';
import { ScoreStrategyType, SENTIMENTS, SentimentsType } from './types';
import Sentiment from 'sentiment';
import { getSentimentType } from './helpers/getSentimentType';

const strategy: Strategy = {
  async evaluateScores(items: string[], scoreThreshold: number): Promise<ScoreStrategyType[]> {
    const client = new Sentiment();

    return Promise.all(items.map(item => {
      if (!item) {
        return { category: SENTIMENTS.undefined as unknown as SentimentsType };
      }

      // comparative is already within [-1, 1]
      const { comparative: score } = client.analyze(item);

      return { score, category: getSentimentType(score, scoreThreshold) };
    }));
  },
};

export default strategy;
