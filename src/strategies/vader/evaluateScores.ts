import { ScoreStrategyType } from '../../types';
import { getSentimentType } from '../../helpers/getSentimentType';

const vader = require('vader-sentiment');

export const evaluateScores = async (
  company: string,
  items: string[],
  scoreThreshold: number,
): Promise<ScoreStrategyType[]> => {
  return Promise.all(items.map(item => {
    const { compound: score } = vader.SentimentIntensityAnalyzer.polarity_scores(item);

    return { score, category: getSentimentType(score, scoreThreshold) };
  }));
};
