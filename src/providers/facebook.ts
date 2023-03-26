import { FacebookClient } from '../clients/facebook';
import { AnalysisResultType, DateRange, ProviderFunctionType } from '../types';
import { getAnalysisResults } from '../helpers/getAnalysisResults';

export const analyze: ProviderFunctionType = async (
  company: string,
  timerange: DateRange,
): Promise<AnalysisResultType> => {
  const posts = await FacebookClient.getPosts(company, timerange);

  return getAnalysisResults(company, 'facebook', posts);
};
