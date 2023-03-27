import { DateRange, MEDIA, MediaType, SentimentAnalysisResult, StrategyType } from '../types';
import { OpenGPT } from '../utils/openai';
import { sentimentMediaFactory } from '../providers/factory';
import { getTimerange } from '../helpers/getTimerange';
import { CONFIG } from '../constants';

type SentimentResult = Record<MediaType, SentimentAnalysisResult>;

const getCompanyMediaSentiment = async (
  company: string,
  media: MediaType,
  timerange: DateRange,
): Promise<SentimentAnalysisResult> => {
  const { STRATEGY_PROVIDER, SCORE_THRESHOLD } = CONFIG;

  const { sentimentStats, scores: analyzedElements } = await sentimentMediaFactory(media)(
    company,
    timerange,
    STRATEGY_PROVIDER as StrategyType,
    SCORE_THRESHOLD,
  );

  // Generate summary text using OpenAI API
  const summary = await new OpenGPT.OpenAIObj()
    .getSummary(company, media, analyzedElements.map((element) => element.text));

  return {
    ...sentimentStats,
    analyzedElements,
    summary,
    timeRange: { from: timerange.since, to: timerange.until },
    sentimentScore: (sentimentStats.positive - sentimentStats.negative) / analyzedElements.length,
    analyzedAt: new Date().toISOString(),
  };
};

export const sentiment = async (company: string): Promise<SentimentResult> => {
  const timerange = getTimerange(CONFIG.SCAN_PERIOD_DAYS);
  const results: SentimentResult | null = null;

  for (const media in MEDIA) {
    results![media as MediaType] = await getCompanyMediaSentiment(company, media as MediaType, timerange);
  }

  return results!;
};
