import { ClientOptions } from 'google-gax';

export enum SENTIMENTS {
  positive = 'positive',
  negative = 'negative',
  neutral = 'neutral',
  undefined = 'undefined',
}

export type SentimentsType = keyof typeof SENTIMENTS;

export type SentimentValues = Record<SentimentsType, number>;

export type Score = {
  text: string;
  score?: number;
  category?: SentimentsType;
};

export enum STRATEGIES {
  google = 'google',
  afinn = 'afinn',
  vader = 'vader',
  bayes = 'bayes',
}

export type StrategyType = keyof typeof STRATEGIES;

export type ScoreStrategyType = {
  score?: number;
  category: SentimentsType;
  probability?: number;
}

type GoogleStategyOptions = ClientOptions;
export type BayesStrategyOptions = {
  positivePath: string;
  negativePath: string;
}

export type ScoreStrategyOptions = GoogleStategyOptions | BayesStrategyOptions;
