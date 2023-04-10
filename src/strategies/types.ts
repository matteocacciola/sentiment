import { ClientOptions } from 'google-gax';

export enum SENTIMENTS {
  positive = 'positive',
  negative = 'negative',
  neutral = 'neutral',
  undefined = 'undefined',
}

export type SentimentType = keyof typeof SENTIMENTS;

export type SentimentValues = Record<SentimentType, number>;

export type Score = {
  text: string;
  score?: number;
  category?: SentimentType;
};

export enum SCORES_STRATEGIES {
  google = 'google',
  afinn = 'afinn',
  vader = 'vader',
  bayes = 'bayes',
}

export type ScoresEvaluatorStrategy = keyof typeof SCORES_STRATEGIES;

export type ScoresEvaluatorResult = {
  score?: number;
  category: SentimentType;
  probability?: number;
}

type GoogleEvaluateScoresStrategyOptions = ClientOptions;
export type BayesEvaluateScoresStrategyOptions = {
  positivePath: string;
  negativePath: string;
}

export type ScoresEvaluatorOptions = GoogleEvaluateScoresStrategyOptions | BayesEvaluateScoresStrategyOptions;
export type ScoresEvaluatorFunction = (
  items: string[],
  threshold: number,
  options?: ScoresEvaluatorOptions
) => Promise<ScoresEvaluatorResult[]>;

export type ScoresEvaluator = ScoresEvaluatorStrategy | ScoresEvaluatorFunction;
