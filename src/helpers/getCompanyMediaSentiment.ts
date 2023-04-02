import { DateRange, MediaType, SentimentAnalysisResult } from '../types';
import { sentimentMediaFactory } from '../providers/factory';
import { OpenAI } from '../utils/openai';
import { ScoreStrategyOptions, StrategyType } from '../strategies/types';

export const getCompanyMediaSentiment = async (
  company: string,
  media: MediaType,
  timerange: DateRange,
  strategyType: StrategyType,
  scoreThreshold: number,
  strategyOptions?: ScoreStrategyOptions,
): Promise<SentimentAnalysisResult> => {
  const result = await sentimentMediaFactory(media)(company, timerange, strategyType, scoreThreshold, strategyOptions);
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
