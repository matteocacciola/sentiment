import { AnalysisResultType, DateRange, ProviderFunctionType } from '../types';
import { NewsClient } from '../clients/news';
import { getAnalysisResults } from '../helpers/getAnalysisResults';

export const analyze: ProviderFunctionType = async (
  company: string,
  timerange: DateRange,
): Promise<AnalysisResultType> => {
  const articles = await NewsClient.getNews(company, timerange);

  return getAnalysisResults(company, 'news', articles);
};
