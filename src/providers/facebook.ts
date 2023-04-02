import { FacebookClient } from '../clients/facebook';
import { AnalysisResultType, DateRange, ProviderFunctionType } from '../types';
import { getAnalysisResults } from '../strategies/helpers/getAnalysisResults';
import { ScoreStrategyOptions, StrategyType } from '../strategies/types';

export const analyze: ProviderFunctionType = async (
  company: string,
  timerange: DateRange,
  strategyType: StrategyType,
  scoreThreshold: number,
  strategyOptions?: ScoreStrategyOptions,
): Promise<AnalysisResultType> => {
  const posts = await FacebookClient.getPosts(company, timerange);

  return getAnalysisResults(company, 'facebook', posts, strategyType, scoreThreshold, strategyOptions);
};
