import Sentiment from 'sentiment';
import { ScoreStrategyType } from '../../types';
import { getSentimentType } from '../../helpers/getSentimentType';

export const evaluateScores = async (
  company: string,
  items: string[],
  scoreThreshold: number,
): Promise<ScoreStrategyType[]> => {
  const client = new Sentiment();

  return Promise.all(items.map(item => {
    const { score } = client.analyze(item);

    return { score, category: getSentimentType(score, scoreThreshold) };
  }));
};
