import { InstagramClient } from '../clients/instagram';
import { AnalysisResultType, DateRange, ProviderFunctionType } from '../types';
import { getAnalysisResults } from '../helpers/getAnalysisResults';

export const analyze: ProviderFunctionType = async (
  company: string,
  timerange: DateRange,
): Promise<AnalysisResultType> => {
  const insta = await InstagramClient.getInsta(company, timerange);

  return getAnalysisResults(company, 'instagram', insta);
};
