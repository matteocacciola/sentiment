import { InstagramClient } from '../clients/instagram';
import { AnalysisResultType, DateRange, ProviderFunctionType } from '../types';
import { getAnalysisResults } from '../strategies/helpers/getAnalysisResults';
import { StrategyType } from '../strategies/types';

export const analyze: ProviderFunctionType = async (
  company: string,
  timerange: DateRange,
  strategyType: StrategyType,
  scoreThreshold: number,
): Promise<AnalysisResultType> => {
  const insta = await InstagramClient.getInsta(company, timerange);

  return getAnalysisResults(company, 'instagram', insta, strategyType, scoreThreshold);
};
