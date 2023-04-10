import Sentiment from 'sentiment';
import { ScoresEvaluatorFunction, ScoresEvaluatorResult, SENTIMENTS, SentimentType } from './types';
import { getSentimentType } from './helpers/getSentimentType';

export const evaluateScores: ScoresEvaluatorFunction = (
  items: string[],
  threshold: number,
): Promise<ScoresEvaluatorResult[]> => {
  const client = new Sentiment();

  return Promise.all(items.map(item => {
    if (!item) {
      return { category: SENTIMENTS.undefined as unknown as SentimentType };
    }

    // comparative is already within [-1, 1]
    const { comparative: score } = client.analyze(item);

    return { score, category: getSentimentType(score, threshold) };
  }));
};
