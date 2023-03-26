import { DateRange, MEDIA, MediaType, SentimentAnalysisResult } from '../types';
import { OpenGPT } from '../utils/openai';
import { sentimentMediaProvider } from '../providers/factory';
import { getTimerange } from '../helpers/getTimerange';

type SentimentResult = Record<MediaType, SentimentAnalysisResult>;

const getCompanyMediaSentiment = async (
  company: string,
  media: MediaType,
  timerange: DateRange,
): Promise<SentimentAnalysisResult> => {
  const { sentimentStats, scores: analyzedElements } = await sentimentMediaProvider(media)(company, timerange);

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
  const timerange = getTimerange();
  const results: SentimentResult | null = null;

  for (const media in MEDIA) {
    results![media as MediaType] = await getCompanyMediaSentiment(company, media as MediaType, timerange);
  }

  return results!;
};
