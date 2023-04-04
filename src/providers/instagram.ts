import { InstagramClient } from '../clients/instagram';
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
  if (!configuration.instagram) {
    throw new Error('Invalid Instagram configuration');
  }
  const insta = await InstagramClient.getInsta(company, timerange, configuration.instagram);

  return getAnalysisResults(company, insta, strategyType, scoreThreshold, strategyOptions);
};
