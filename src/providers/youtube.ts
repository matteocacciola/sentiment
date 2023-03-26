import { YoutubeClient } from '../clients/youtube';
import { AnalysisResultType, DateRange, ProviderFunctionType } from '../types';
import { getAnalysisResults } from '../helpers/getAnalysisResults';

export const analyze: ProviderFunctionType = async (
  company: string,
  timerange: DateRange,
): Promise<AnalysisResultType> => {
  const comments = await YoutubeClient.getComments(company, timerange);

  return getAnalysisResults(company, 'youtube', comments);
};
