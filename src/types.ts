import { Score, ScoreStrategyOptions, SentimentValues, StrategyType } from './strategies/types';
import {
  FacebookClientType,
  InstagramClientType,
  NewsClientType, OpenAiClientType,
  TiktokClientType,
  TwitterClientType, YoutubeClientType,
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

export type AnalysisResultType = {
  sentimentStats: SentimentValues;
  scores: Score[];
} | null;
export type StatsResultType = AnalysisResultType;

export type ProviderFunctionType = (
  company: string,
  timerange: DateRange,
  strategyType: StrategyType,
  scoreThreshold: number,
  configuration: SentimentConfigurationType,
  strategyOptions?: ScoreStrategyOptions,
) => Promise<AnalysisResultType>;

export type DescriptiveSource = {
  text: string;
  rating: number;
};

export type MatchedAttributes = {
  overallMatch: number;
  positiveMatch: number;
  negativeMatch: number;
};

export type SentimentConfigurationType = {
  facebook?: FacebookClientType;
  instagram?: InstagramClientType;
  news?: NewsClientType;
  tiktok?: TiktokClientType;
  twitter?: TwitterClientType;
  youtube?: YoutubeClientType;
  openai: OpenAiClientType;
};
