import { FacebookClient } from '../clients/facebook';
import { AnalysisResults, DateRange, ProviderFunction, SentimentConfiguration } from '../types';
import { getAnalysisResults } from '../strategies/helpers/getAnalysisResults';
import { ScoresEvaluatorOptions, ScoresEvaluator } from '../strategies/types';

export const analyze: ProviderFunction = async (
  company: string,
  timerange: DateRange,
  scoresEvaluator: ScoresEvaluator,
  scoreThreshold: number,
  configuration: SentimentConfiguration,
  scoresEvaluatorOptions?: ScoresEvaluatorOptions,
): Promise<AnalysisResults | null> => {
  if (!configuration.facebook) {
    throw new Error('Invalid Facebook configuration');
  }
  const posts = await FacebookClient.getPosts(company, timerange, configuration.facebook);

  return getAnalysisResults(company, posts, scoresEvaluator, scoreThreshold, scoresEvaluatorOptions);
};
