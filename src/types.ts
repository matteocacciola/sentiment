import { Score, ScoresEvaluatorOptions, SentimentValues, ScoresEvaluator } from './strategies/types';
import {
  FacebookClientConfiguration,
  InstagramClientConfiguration,
  NewsClientConfiguration,
  OpenAIClientConfiguration,
  TiktokClientConfiguration,
  TwitterClientConfiguration,
  YoutubeClientConfiguration,
} from './clients/types';

export type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
  [Property in Key]-?: Type[Property];
};

export type WithNotNullProperty<Type, Key extends keyof Type> = Type & {
  [Property in Key]: NonNullable<Type[Property]>;
};

export type WithRequiredAndNotNullProperty<Type, Key extends keyof Type> = WithNotNullProperty<
  WithRequiredProperty<Type, Key>,
  Key
>;

export type WithAtLeastProperty<Type, Key extends keyof Type> = Partial<Type> & Pick<Type, Key>;

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

export type AnalysisResults = {
  sentimentStats: SentimentValues;
  scores: Score[];
} | null;
export type StatsResults = AnalysisResults;

export type ProviderFunction = (
  company: string,
  timerange: DateRange,
  strategy: ScoresEvaluator,
  scoreThreshold: number,
  configuration: SentimentConfiguration,
  scoresEvaluatorOptions?: ScoresEvaluatorOptions,
) => Promise<AnalysisResults>;

export type DescriptiveSource = {
  text: string;
  rating: number;
};

export type SentimentConfiguration = {
  facebook?: FacebookClientConfiguration;
  instagram?: InstagramClientConfiguration;
  news?: NewsClientConfiguration;
  tiktok?: TiktokClientConfiguration;
  twitter?: TwitterClientConfiguration;
  youtube?: YoutubeClientConfiguration;
  openai: OpenAIClientConfiguration;
};
