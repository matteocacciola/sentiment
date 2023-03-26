import * as Sentiment from 'sentiment';
import { ScoreStrategyType } from '../../types';
import { getSentimentType } from '../../helpers/getSentimentType';

export const evaluateScores = async (company: string, items: string[]): Promise<ScoreStrategyType[]> => {
  const client = new Sentiment();

  return Promise.all(items.map(async (item) => {
    const { score } = client.analyze(item);

    return { score, category: getSentimentType(score) };
  }));
};
