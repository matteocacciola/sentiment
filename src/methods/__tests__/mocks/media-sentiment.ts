import { SentimentsType } from '../../../strategies/types';
import { DateRange, SentimentAnalysisResult } from '../../../types';

const sentimentStats = {
  positive: 1,
  negative: 1,
  neutral: 0,
  undefined: 0,
};
const analyzedElements = [
  {
    text: 'Text 1',
    score: 0.4,
    category: 'positive' as SentimentsType,
  },
  {
    text: 'Text 2',
    score: -0.8,
    category: 'negative' as SentimentsType,
  },
];

export const mockedGetCompanyMediaSentimentResult = (timerange: DateRange): SentimentAnalysisResult => ({
  ...sentimentStats,
  analyzedElements,
  summary: 'This is a summary from ChatGPT',
  timeRange: { from: timerange.since, to: timerange.until },
  sentimentScore: (sentimentStats.positive - sentimentStats.negative) / analyzedElements.length,
  analyzedAt: new Date().toISOString(),
});
