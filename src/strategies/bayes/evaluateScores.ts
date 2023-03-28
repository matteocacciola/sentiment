import { ScoreStrategyType, SENTIMENTS, SentimentsType } from '../../types';

const SentimentClassifier = require('node-sentiment');

export const evaluateScores = async (company: string, items: string[]): Promise<ScoreStrategyType[]> => {
  const classifier = new SentimentClassifier();

  return Promise.all(items.map(item => {
    if (!item) {
      return { category: SENTIMENTS.undefined as unknown as SentimentsType };
    }

    const { sentiment: category, probability } = classifier.classify('it is very sunny today');

    return { probability, category };
  }));
};
