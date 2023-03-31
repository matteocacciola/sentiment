import { getSentimentType } from '../helpers/getSentimentType';
import { ScoreStrategyType, SentimentsType, SENTIMENTS } from '../types';

const vader = require('vader-sentiment');

export const evaluateScores = async (
  company: string,
  items: string[],
  scoreThreshold: number,
): Promise<ScoreStrategyType[]> => {
  return Promise.all(items.map(item => {
    if (!item) {
      return { category: SENTIMENTS.undefined as unknown as SentimentsType };
    }

    const { compound: score } = vader.SentimentIntensityAnalyzer.polarity_scores(item);

    return { score, category: getSentimentType(score, scoreThreshold) };
  }));
};
