import { Strategy } from './interfaces';
import { ScoreStrategyType, SENTIMENTS, SentimentsType } from './types';
import Sentiment from 'sentiment';
import { getSentimentType } from './helpers/getSentimentType';

const strategy: Strategy = {
  async evaluateScores(
    company: string,
    items: string[],
    scoreThreshold: number,
  ): Promise<ScoreStrategyType[]> {
    const client = new Sentiment();

    return Promise.all(items.map(item => {
      if (!item) {
        return { category: SENTIMENTS.undefined as unknown as SentimentsType };
      }

      const { comparative } = client.analyze(item);

      return { score: comparative, category: getSentimentType(comparative, scoreThreshold) };
    }));
  },
};

export default strategy;
