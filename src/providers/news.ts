import { AnalysisResultType, DateRange, ProviderFunctionType, StrategyType } from '../types';
import { NewsClient } from '../clients/news';
import { getAnalysisResults } from '../helpers/getAnalysisResults';

export const analyze: ProviderFunctionType = async (
  company: string,
  timerange: DateRange,
  strategyType: StrategyType,
  scoreThreshold: number,
): Promise<AnalysisResultType> => {
  const articles = await NewsClient.getNews(company, timerange);

  return getAnalysisResults(company, 'news', articles, strategyType, scoreThreshold);
};
