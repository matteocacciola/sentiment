import { AnalysisResultType, DateRange, ProviderFunctionType, SentimentConfigurationType } from '../types';
import { TiktokClient } from '../clients/tiktok';
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
  if (!configuration.tiktok) {
    throw new Error('Invalid TikTok configuration');
  }
  const captions = await TiktokClient.getCaptions(company, timerange, configuration.tiktok);

  return getAnalysisResults(company, captions, strategyType, scoreThreshold, strategyOptions);
};
