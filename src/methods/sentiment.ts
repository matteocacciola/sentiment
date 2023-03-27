import { SentimentAnalysisResult, StrategyType } from '../types';
import { getTimerange } from '../helpers/getTimerange';
import { CONFIG } from '../constants';
import { validator } from '../validators/sentiment';
import { getCompanyMediaSentiment } from '../helpers/getCompanyMediaSentiment';

type SentimentResult = Record<string, SentimentAnalysisResult | null>[];

export const sentiment = async (company: string): Promise<SentimentResult> => {
  const mediaConfigured = CONFIG.MEDIA_ENABLED?.split(',');
  const media = validator(mediaConfigured);

  const timerange = getTimerange(CONFIG.SCAN_PERIOD_DAYS);
  const { STRATEGY_PROVIDER, SCORE_THRESHOLD } = CONFIG;

  return Promise.all(media.map(async (medium) => {
    return { [medium]: await getCompanyMediaSentiment(
      company,
      medium,
      timerange,
      STRATEGY_PROVIDER as StrategyType,
      SCORE_THRESHOLD,
    ) };
  }));
};
