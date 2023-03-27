import { ScoreStrategyType, SENTIMENTS, SentimentsType } from '../../types';
import { getSentimentType } from '../../helpers/getSentimentType';

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
