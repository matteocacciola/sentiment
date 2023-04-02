import { AnalysisResultType, DateRange, ProviderFunctionType } from '../types';
import { NewsClient } from '../clients/news';
import { getAnalysisResults } from '../strategies/helpers/getAnalysisResults';
import { ScoreStrategyOptions, StrategyType } from '../strategies/types';

export const analyze: ProviderFunctionType = async (
  company: string,
  timerange: DateRange,
  strategyType: StrategyType,
  scoreThreshold: number,
  strategyOptions?: ScoreStrategyOptions,
): Promise<AnalysisResultType> => {
  const articles = await NewsClient.getNews(company, timerange);

  return getAnalysisResults(company, 'news', articles, strategyType, scoreThreshold, strategyOptions);
};
