import { SentimentAnalysisResult } from '../types';
import { getTimerange } from '../helpers/getTimerange';
import { validator } from '../validators/sentiment';
import { getCompanyMediaSentiment } from '../helpers/getCompanyMediaSentiment';
import { ScoreStrategyOptions, StrategyType } from '../strategies/types';

type SentimentResult = Record<string, SentimentAnalysisResult>[];

type SentimentConfig = {
  strategy: StrategyType;
  scanPeriodDays: number;
  scoreThreshold: number;
  strategyOptions: ScoreStrategyOptions;
}

export const sentiment = async (
  company: string,
  media: string[],
  options?: SentimentConfig,
): Promise<SentimentResult> => {
  const validatedMedia = validator(media);

  const { strategy, scanPeriodDays, scoreThreshold, strategyOptions } = options ?? {};
  const scaledScoreThreshold = Math.min(Math.abs(scoreThreshold ?? 0.3), 1);
  const timerange = getTimerange(scanPeriodDays ?? 7);

  return Promise.all(validatedMedia.map(async (medium) => {
    return { [medium]: await getCompanyMediaSentiment(
      company,
      medium,
      timerange,
      strategy ?? 'afinn',
      scaledScoreThreshold,
      strategyOptions,
    ) };
  }));
};
