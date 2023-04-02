import { YoutubeClient } from '../clients/youtube';
import { AnalysisResultType, DateRange, ProviderFunctionType } from '../types';
import { getAnalysisResults } from '../strategies/helpers/getAnalysisResults';
import { CONFIG } from '../constants';
import { ScoreStrategyOptions, StrategyType } from '../strategies/types';

export const analyze: ProviderFunctionType = async (
  company: string,
  timerange: DateRange,
  strategyType: StrategyType,
  scoreThreshold: number,
  strategyOptions?: ScoreStrategyOptions,
): Promise<AnalysisResultType> => {
  const comments = await YoutubeClient.getComments(
    company,
    timerange,
    CONFIG.YOUTUBE.COUNT.VIDEO,
    CONFIG.YOUTUBE.COUNT.COMMENTS,
  );

  return getAnalysisResults(company, 'youtube', comments, strategyType, scoreThreshold, strategyOptions);
};
