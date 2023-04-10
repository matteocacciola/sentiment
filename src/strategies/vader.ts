import { ScoresEvaluatorFunction, ScoresEvaluatorResult, SENTIMENTS, SentimentType } from './types';
import { getSentimentType } from './helpers/getSentimentType';

const vader = require('vader-sentiment');

export const evaluateScores: ScoresEvaluatorFunction = async (
  items: string[],
  threshold: number,
): Promise<ScoresEvaluatorResult[]> => {
  return Promise.all(items.map(item => {
    if (!item) {
      return { category: SENTIMENTS.undefined as unknown as SentimentType };
    }

    // compund is already within [-1, 1]
    const { compound: score } = vader.SentimentIntensityAnalyzer.polarity_scores(item);

    return { score, category: getSentimentType(score, threshold) };
  }));
};
