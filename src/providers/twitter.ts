import { AnalysisResultType, DateRange, ProviderFunctionType } from '../types';
import { TwitterClient } from '../clients/twitter';
import { getAnalysisResults } from '../helpers/getAnalysisResults';

export const analyze: ProviderFunctionType = async (
  company: string,
  timerange: DateRange,
): Promise<AnalysisResultType> => {
  const tweets = await TwitterClient.getTweets(company, timerange);

  return getAnalysisResults(company, 'twitter', tweets);
};
