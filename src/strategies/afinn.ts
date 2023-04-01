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

      /*
       * the score is within [0, 5] and I need to rescale within [-1, 1], by applying the formula
       * NewValue = (((OldValue - OldMin) * (NewMax - NewMin)) / (OldMax - OldMin)) + NewMin
       */
      const { score } = client.analyze(item);
      const scaled = ((2 * score) / 5) - 1;

      return { score: scaled, category: getSentimentType(score, scoreThreshold) };
    }));
  },
};

export default strategy;
