import { InstagramClient } from '../clients/instagram';
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
  if (!configuration.instagram) {
    throw new Error('Invalid Instagram configuration');
  }
  const insta = await InstagramClient.getInsta(company, timerange, configuration.instagram);

  return getAnalysisResults(company, insta, scoresEvaluator, scoreThreshold, scoresEvaluatorOptions);
};
