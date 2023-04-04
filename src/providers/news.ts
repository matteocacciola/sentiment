import { AnalysisResultType, DateRange, ProviderFunctionType, SentimentConfigurationType } from '../types';
import { NewsClient } from '../clients/news';
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
  if (!configuration.news) {
    throw new Error('Invalid NewsAPI configuration');
  }
  const articles = await NewsClient.getNews(company, timerange, configuration.news);

  return getAnalysisResults(company, articles, strategyType, scoreThreshold, strategyOptions);
};
