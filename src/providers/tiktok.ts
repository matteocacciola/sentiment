import { AnalysisResultType, DateRange, ProviderFunctionType } from '../types';
import { TiktokClient } from '../clients/tiktok';
import { getAnalysisResults } from '../helpers/getAnalysisResults';

export const analyze: ProviderFunctionType = async (
  company: string,
  timerange: DateRange,
): Promise<AnalysisResultType> => {
  const captions = await TiktokClient.getCaptions(company, timerange);

  return getAnalysisResults(company, 'tiktok', captions);
};
