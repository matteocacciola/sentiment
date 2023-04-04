import { AnalysisResultType, DateRange, ProviderFunctionType, SentimentConfigurationType } from '../types';
import { TwitterClient } from '../clients/twitter';
import { getAnalysisResults } from '../strategies/helpers/getAnalysisResults';
import { ScoreStrategyOptions, StrategyType } from '../strategies/types';

export const analyze: ProviderFunctionType = async (
  company: string,
  timerange: DateRange,
  strategyType: StrategyType,
  scoreThreshold: number,
  configuration: SentimentConfigurationType,
  strategyOptions?: ScoreStrategyOptions,
): Promise<AnalysisResultType> => {
  if (!configuration.twitter) {
    throw new Error('Invalid Twitter configuration');
  }
  const tweets = await TwitterClient.getTweets(company, timerange, configuration.twitter);

  return getAnalysisResults(company, tweets, strategyType, scoreThreshold, strategyOptions);
};
