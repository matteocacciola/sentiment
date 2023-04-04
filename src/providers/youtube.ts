import { YoutubeClient } from '../clients/youtube';
import { AnalysisResultType, DateRange, ProviderFunctionType, SentimentConfigurationType } from '../types';
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
  if (!configuration.youtube) {
    throw new Error('Invalid YouTube configuration');
  }
  const comments = await YoutubeClient.getComments(company, timerange, configuration.youtube);

  return getAnalysisResults(company, comments, strategyType, scoreThreshold, strategyOptions);
};
