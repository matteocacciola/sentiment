import { YoutubeClient } from '../clients/youtube';
import { AnalysisResultType, DateRange, ProviderFunctionType, StrategyType } from '../types';
import { getAnalysisResults } from '../helpers/getAnalysisResults';
import { CONFIG } from '../constants';

export const analyze: ProviderFunctionType = async (
  company: string,
  timerange: DateRange,
  strategyType: StrategyType,
  scoreThreshold: number,
): Promise<AnalysisResultType> => {
  const comments = await YoutubeClient.getComments(
    company,
    timerange,
    CONFIG.YOUTUBE.COUNT.VIDEO,
    CONFIG.YOUTUBE.COUNT.COMMENTS
  );

  return getAnalysisResults(company, 'youtube', comments, strategyType, scoreThreshold);
};
