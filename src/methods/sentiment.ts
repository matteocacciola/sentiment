import { SentimentAnalysisResult } from '../types';
import { getTimerange } from '../helpers/getTimerange';
import { CONFIG } from '../constants';
import { validator } from '../validators/sentiment';
import { getCompanyMediaSentiment } from '../helpers/getCompanyMediaSentiment';
import { StrategyType } from '../strategies/types';

type SentimentResult = Record<string, SentimentAnalysisResult>[];

type SentimentConfig = {
  strategy: StrategyType;
  scanPeriodDays: number;
  scoreThreshold: number;
}

export const sentiment = async (company: string, options?: SentimentConfig): Promise<SentimentResult> => {
  const strategy = options?.strategy ?? 'afinn';
  const scanPeriodDays = options?.scanPeriodDays ?? 7;
  const scoreThreshold = options?.scoreThreshold ?? 0.3;

  const mediaConfigured = CONFIG.MEDIA_ENABLED?.split(',').map(s => s.trim());
  const media = validator(mediaConfigured);

  const timerange = getTimerange(scanPeriodDays);

  return Promise.all(media.map(async (medium) => {
    return { [medium]: await getCompanyMediaSentiment(
      company,
      medium,
      timerange,
      strategy,
      Math.min(scoreThreshold < 0 ? -scoreThreshold : scoreThreshold, 1),
    ) };
  }));
};
