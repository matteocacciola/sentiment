import { AnalysisResultType, DateRange, ProviderFunctionType } from '../types';
import { TwitterClient } from '../clients/twitter';
import { getAnalysisResults } from '../strategies/helpers/getAnalysisResults';
import { CONFIG } from '../constants';
import { StrategyType } from '../strategies/types';

export const analyze: ProviderFunctionType = async (
  company: string,
  timerange: DateRange,
  strategyType: StrategyType,
  scoreThreshold: number,
): Promise<AnalysisResultType> => {
  const tweets = await TwitterClient.getTweets(company, timerange, CONFIG.TWITTER.COUNT);

  return getAnalysisResults(company, 'twitter', tweets, strategyType, scoreThreshold);
};
