import { FacebookClient } from '../clients/facebook';
import { AnalysisResultType, DateRange, ProviderFunctionType, SentimentConfigurationType } from '../types';
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
  if (!configuration.facebook) {
    throw new Error('Invalid Facebook configuration');
  }
  const posts = await FacebookClient.getPosts(company, timerange, configuration.facebook);

  return getAnalysisResults(company, posts, strategyType, scoreThreshold, strategyOptions);
};
