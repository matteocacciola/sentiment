import { SentimentAnalysisResult, SentimentConfiguration } from '../types';
import { getTimerange } from '../helpers/getTimerange';
import { validator } from '../validators/sentiment';
import { getCompanyMediaSentiment } from '../helpers/getCompanyMediaSentiment';
import { ScoresEvaluatorOptions, ScoresEvaluator } from '../strategies/types';

type SentimentResult = Record<string, SentimentAnalysisResult>[];

type SentimentConfig = {
  scoresEvaluator: ScoresEvaluator;
  scanPeriodDays: number;
  scoreThreshold: number;
  scoresEvaluatorOptions: ScoresEvaluatorOptions;
}

export const mediaSentiment = async (
  company: string,
  media: string[],
  configuration: SentimentConfiguration,
  options?: SentimentConfig,
): Promise<SentimentResult> => {
  const validatedMedia = validator(media);

  const { scoresEvaluator, scanPeriodDays, scoreThreshold, scoresEvaluatorOptions } = options ?? {};
  const scaledScoreThreshold = Math.min(Math.abs(scoreThreshold ?? 0.3), 1);
  const timerange = getTimerange(scanPeriodDays ?? 7);

  return Promise.all(validatedMedia.map(async (medium) => {
    return { [medium]: await getCompanyMediaSentiment(
      company,
      medium,
      timerange,
      configuration,
      scoresEvaluator ?? 'afinn',
      scaledScoreThreshold,
      scoresEvaluatorOptions,
    ) };
  }));
};
