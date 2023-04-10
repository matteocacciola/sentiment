import { AnalysisResults, DateRange, ProviderFunction, SentimentConfiguration } from '../types';
import { TiktokClient } from '../clients/tiktok';
import { getAnalysisResults } from '../strategies/helpers/getAnalysisResults';
import { ScoresEvaluatorOptions, ScoresEvaluator } from '../strategies/types';

export const analyze: ProviderFunction = async (
  company: string,
  timerange: DateRange,
  scoresEvaluator: ScoresEvaluator,
  scoreThreshold: number,
  configuration: SentimentConfiguration,
  scoresEvaluatorOptions?: ScoresEvaluatorOptions,
): Promise<AnalysisResults> => {
  if (!configuration.tiktok) {
    throw new Error('Invalid TikTok configuration');
  }
  const captions = await TiktokClient.getCaptions(company, timerange, configuration.tiktok);

  return getAnalysisResults(company, captions, scoresEvaluator, scoreThreshold, scoresEvaluatorOptions);
};
