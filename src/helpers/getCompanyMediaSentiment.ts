import { DateRange, MediaType, SentimentAnalysisResult, StrategyType } from '../types';
import { sentimentMediaFactory } from '../providers/factory';
import { OpenAI } from '../utils/openai';

export const getCompanyMediaSentiment = async (
  company: string,
  media: MediaType,
  timerange: DateRange,
  strategyType: StrategyType,
  scoreThreshold: number,
): Promise<SentimentAnalysisResult | null> => {
  const result = await sentimentMediaFactory(media)(company, timerange, strategyType, scoreThreshold);
  if (!result) {
    return null;
  }

  const { sentimentStats, scores: analyzedElements } = result;

  // Generate summary text using OpenAI API
  const summary = await OpenAI.getSummary(company, media, analyzedElements.map((element) => element.text));

  return {
    ...sentimentStats,
    analyzedElements,
    summary,
    timeRange: { from: timerange.since, to: timerange.until },
    sentimentScore: (sentimentStats.positive - sentimentStats.negative) / analyzedElements.length,
    analyzedAt: new Date().toISOString(),
  };
};
