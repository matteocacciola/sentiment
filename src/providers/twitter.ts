import { AnalysisResultType, DateRange, ProviderFunctionType, StrategyType } from '../types';
import { TwitterClient } from '../clients/twitter';
import { getAnalysisResults } from '../helpers/getAnalysisResults';
import { CONFIG } from '../constants';

export const analyze: ProviderFunctionType = async (
  company: string,
  timerange: DateRange,
  strategyType: StrategyType,
  scoreThreshold: number,
): Promise<AnalysisResultType> => {
  const tweets = await TwitterClient.getTweets(company, timerange, CONFIG.TWITTER.COUNT);

  return getAnalysisResults(company, 'twitter', tweets, strategyType, scoreThreshold);
};
