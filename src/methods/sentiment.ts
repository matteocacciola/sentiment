import { SentimentAnalysisResult } from '../types';
import { getTimerange } from '../helpers/getTimerange';
import { CONFIG } from '../constants';
import { validator } from '../validators/sentiment';
import { getCompanyMediaSentiment } from '../helpers/getCompanyMediaSentiment';
import { StrategyType } from '../strategies/types';

type SentimentResult = Record<string, SentimentAnalysisResult | null>[];

export const sentiment = async (company: string): Promise<SentimentResult> => {
  const mediaConfigured = CONFIG.MEDIA_ENABLED?.split(',').map(s => s.trim());
  const media = validator(mediaConfigured);

  const timerange = getTimerange(CONFIG.SCAN_PERIOD_DAYS);
  const { STRATEGY_PROVIDER, SCORE_THRESHOLD } = CONFIG;

  return Promise.all(media.map(async (medium) => {
    return { [medium]: await getCompanyMediaSentiment(
      company,
      medium,
      timerange,
      STRATEGY_PROVIDER as StrategyType,
      Math.min(SCORE_THRESHOLD < 0 ? -SCORE_THRESHOLD : SCORE_THRESHOLD, 1),
    ) };
  }));
};
