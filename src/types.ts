import { Score, SentimentValues, StrategyType } from './strategies/types';

export type DateRange = {
  since: string;
  until: string;
};

export type SentimentAnalysisResult = {
  positive: number;
  negative: number;
  neutral: number;
  analyzedElements: Score[];
  summary?: string | null;
  timeRange: {
    from: string;
    to: string;
  };
  sentimentScore: number;
  analyzedAt: string;
} | null;

export enum MEDIA {
  facebook = 'facebook',
  instagram = 'instagram',
  news = 'news',
  tiktok = 'tiktok',
  twitter = 'twitter',
  youtube = 'youtube',
}

export type MediaType = keyof typeof MEDIA;

export type AnalysisResultType = {
  sentimentStats: SentimentValues;
  scores: Score[];
} | null;

export type ProviderFunctionType = (
  company: string,
  timerange: DateRange,
  strategyType: StrategyType,
  scoreThreshold: number,
) => Promise<AnalysisResultType>;

export type DescriptiveSource = {
  text: string;
  rating: number;
}

export type MatchedAttributes = {
  overallMatch: number;
  positiveMatch: number;
  negativeMatch: number;
}
