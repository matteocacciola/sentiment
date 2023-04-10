import {
  BayesEvaluateScoresStrategyOptions,
  ScoresEvaluatorFunction,
  ScoresEvaluatorOptions,
  ScoresEvaluatorResult,
  SENTIMENTS,
  SentimentType,
} from './types';
import { bayesSentiment } from '../libraries/naive-bayes';

export const evaluateScores: ScoresEvaluatorFunction = async (
  items: string[],
  threshold: number,
  options?: ScoresEvaluatorOptions,
): Promise<ScoresEvaluatorResult[]> => {
  return Promise.all(items.map(item => {
    if (!item) {
      return { category: SENTIMENTS.undefined as unknown as SentimentType };
    }

    const { sentiment: category, probability } = bayesSentiment(
      item,
      (options as BayesEvaluateScoresStrategyOptions)?.positivePath,
      (options as BayesEvaluateScoresStrategyOptions)?.negativePath,
    );

    // probability is within [0, 1]
    return { probability, category: category as SentimentType };
  }));
};
