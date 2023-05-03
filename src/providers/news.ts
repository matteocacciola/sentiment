import { AnalysisResults, DateRange, ProviderFunction, SentimentConfiguration } from '../types';
import { NewsClient } from '../clients/news';
import { getAnalysisResults } from '../strategies/helpers/getAnalysisResults';
import { ScoresEvaluatorOptions, ScoresEvaluator } from '../strategies/types';

export const analyze: ProviderFunction = async (
  company: string,
  timerange: DateRange,
  scoresEvaluator: ScoresEvaluator,
  scoreThreshold: number,
  configuration: SentimentConfiguration,
  scoresEvaluatorOptions?: ScoresEvaluatorOptions,
): Promise<AnalysisResults | null> => {
  if (!configuration.news) {
    throw new Error('Invalid NewsAPI configuration');
  }
  const articles = await NewsClient.getNews(company, timerange, configuration.news);

  return getAnalysisResults(company, articles, scoresEvaluator, scoreThreshold, scoresEvaluatorOptions);
};
