import { InstagramClient } from '../clients/instagram';
import { AnalysisResultType, DateRange, ProviderFunctionType, StrategyType } from '../types';
import { getAnalysisResults } from '../helpers/getAnalysisResults';

export const analyze: ProviderFunctionType = async (
  company: string,
  timerange: DateRange,
  strategyType: StrategyType,
  scoreThreshold: number,
): Promise<AnalysisResultType> => {
  const insta = await InstagramClient.getInsta(company, timerange);

  return getAnalysisResults(company, 'instagram', insta, strategyType, scoreThreshold);
};
