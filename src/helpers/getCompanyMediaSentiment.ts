import { DateRange, MediaType, SentimentAnalysisResult, SentimentConfiguration } from '../types';
import { sentimentMediaFactory } from '../providers/factory';
import { OpenAI } from '../utils/openai';
import { ScoresEvaluatorOptions, ScoresEvaluator } from '../strategies/types';

export const getCompanyMediaSentiment = async (
  company: string,
  media: MediaType,
  timerange: DateRange,
  configuration: SentimentConfiguration,
  scoresEvaluator: ScoresEvaluator,
  scoreThreshold: number,
  scoresEvaluatorOptions?: ScoresEvaluatorOptions,
): Promise<SentimentAnalysisResult> => {
  const { openai } = configuration;
  const result = await sentimentMediaFactory(media)(
    company,
    timerange,
    scoresEvaluator,
    scoreThreshold,
    configuration,
    scoresEvaluatorOptions,
  );
  if (!result) {
    return null;
  }

  const { sentimentStats, scores: analyzedElements } = result;

  // Generate summary text using OpenAI API
  const summary = await OpenAI.getSummary(openai, company, media, analyzedElements.map((element) => element.text));

  return {
    ...sentimentStats,
    analyzedElements,
    summary,
    timeRange: { from: timerange.since, to: timerange.until },
    sentimentScore: (sentimentStats.positive - sentimentStats.negative) / analyzedElements.length,
    analyzedAt: new Date().toISOString(),
  };
};
