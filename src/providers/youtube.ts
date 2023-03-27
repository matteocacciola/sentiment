import { YoutubeClient } from '../clients/youtube';
import { AnalysisResultType, DateRange, ProviderFunctionType, StrategyType } from '../types';
import { getAnalysisResults } from '../helpers/getAnalysisResults';

export const analyze: ProviderFunctionType = async (
  company: string,
  timerange: DateRange,
  strategyType: StrategyType,
  scoreThreshold: number,
): Promise<AnalysisResultType> => {
  const comments = await YoutubeClient.getComments(company, timerange);

  return getAnalysisResults(company, 'youtube', comments, strategyType, scoreThreshold);
};
