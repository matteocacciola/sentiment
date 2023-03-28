import { FacebookClient } from '../clients/facebook';
import { AnalysisResultType, DateRange, ProviderFunctionType, StrategyType } from '../types';
import { getAnalysisResults } from '../helpers/getAnalysisResults';

export const analyze: ProviderFunctionType = async (
  company: string,
  timerange: DateRange,
  strategyType: StrategyType,
  scoreThreshold: number,
): Promise<AnalysisResultType> => {
  const posts = await FacebookClient.getPosts(company, timerange);

  return getAnalysisResults(company, 'facebook', posts, strategyType, scoreThreshold);
};
