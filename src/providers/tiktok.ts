import { AnalysisResultType, DateRange, ProviderFunctionType } from '../types';
import { TiktokClient } from '../clients/tiktok';
import { getAnalysisResults } from '../strategies/helpers/getAnalysisResults';
import { CONFIG } from '../constants';
import { StrategyType } from '../strategies/types';

export const analyze: ProviderFunctionType = async (
  company: string,
  timerange: DateRange,
  strategyType: StrategyType,
  scoreThreshold: number,
): Promise<AnalysisResultType> => {
  const captions = await TiktokClient.getCaptions(company, timerange, CONFIG.TIKTOK.COUNT);

  return getAnalysisResults(company, 'tiktok', captions, strategyType, scoreThreshold);
};
