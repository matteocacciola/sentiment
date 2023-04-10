import { AnalysisResults, DateRange, ProviderFunction, SentimentConfiguration } from '../types';
import { TwitterClient } from '../clients/twitter';
import { getAnalysisResults } from '../strategies/helpers/getAnalysisResults';
import { ScoresEvaluatorOptions, ScoresEvaluator } from '../strategies/types';

export const analyze: ProviderFunction = async (
  company: string,
  timerange: DateRange,
  scoresEvaluator: ScoresEvaluator,
  scoreThreshold: number,
  configuration: SentimentConfiguration,
  scoresEvaluatorOptions?: ScoresEvaluatorOptions,
): Promise<AnalysisResults> => {
  if (!configuration.twitter) {
    throw new Error('Invalid Twitter configuration');
  }
  const tweets = await TwitterClient.getTweets(company, timerange, configuration.twitter);

  return getAnalysisResults(company, tweets, scoresEvaluator, scoreThreshold, scoresEvaluatorOptions);
};
