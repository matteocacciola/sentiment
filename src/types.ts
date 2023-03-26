export type DateRange = {
  since: string;
  until: string;
};

export enum SENTIMENTS {
  positive,
  negative,
  neutral,
  undefined,
}

export type SentimentsType = keyof typeof SENTIMENTS;

export type SentimentValues = Record<SentimentsType, number>;

export type Score = {
  text: string;
  score?: number;
  category?: SentimentsType;
};

export type ScoreStrategyType = {
  score?: number;
  category: SentimentsType;
}

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
};

export enum MEDIA {
  facebook = 'FACEBOOK',
  instagram = 'INSTAGRAM',
  news = 'NEWS',
  tiktok = 'TIKTOK',
  twitter = 'TWITTER',
  youtube = 'YOUTUBE',
}

export type MediaType = keyof typeof MEDIA;

export type AnalysisResultType = {
  sentimentStats: SentimentValues;
  scores: Score[];
};

export type CallbackFunctionType = (...args: any[]) => any;

export type ProviderFunctionType = (company: string, timerange: DateRange) => Promise<AnalysisResultType>;

export enum STRATEGIES {
  google = 'GOOGLE',
  afinn = 'AFINN',
  vader = 'VADER',
}

export type StrategyType = keyof typeof STRATEGIES;
