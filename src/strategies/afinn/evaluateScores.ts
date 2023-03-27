import Sentiment from 'sentiment';
import { ScoreStrategyType, SENTIMENTS, SentimentsType } from '../../types';
import { getSentimentType } from '../../helpers/getSentimentType';

export const evaluateScores = async (
  company: string,
  items: string[],
  scoreThreshold: number,
): Promise<ScoreStrategyType[]> => {
  const client = new Sentiment();

  return Promise.all(items.map(item => {
    if (!item) {
      return { category: SENTIMENTS.undefined as unknown as SentimentsType };
    }

    const { comparative } = client.analyze(item);

    return { score: comparative, category: getSentimentType(comparative, scoreThreshold) };
  }));
};
