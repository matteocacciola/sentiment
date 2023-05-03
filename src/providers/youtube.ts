import { YoutubeClient } from '../clients/youtube';
import { AnalysisResults, DateRange, ProviderFunction, SentimentConfiguration } from '../types';
import { getAnalysisResults } from '../strategies/helpers/getAnalysisResults';
import { ScoresEvaluatorOptions, ScoresEvaluator } from '../strategies/types';

export const analyze: ProviderFunction = async (
  company: string,
  timerange: DateRange,
  scoresEvaluator: ScoresEvaluator,
  scoreThreshold: number,
  configuration: SentimentConfiguration,
  scoresEvaluatorOptions?: ScoresEvaluatorOptions,
): Promise<AnalysisResults | null> => {
  if (!configuration.youtube) {
    throw new Error('Invalid YouTube configuration');
  }
  const comments = await YoutubeClient.getComments(company, timerange, configuration.youtube);

  return getAnalysisResults(company, comments, scoresEvaluator, scoreThreshold, scoresEvaluatorOptions);
};
