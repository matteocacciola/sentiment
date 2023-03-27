import process from 'process';

export const FACEBOOK = {
  ACCESS_TOKEN: `${process.env.FACEBOOK_ACCESS_TOKEN}`,
};

export const INSTAGRAM = {
  ACCESS_TOKEN: `${process.env.INSTAGRAM_ACCESS_TOKEN}`,
};

export const TWITTER = {
  CONFIG: {
    APP_KEY: `${process.env.TWITTER_APP_KEY}`,
    APP_SECRET: `${process.env.TWITTER_APP_SECRET}`,
    ACCESS_TOKEN: `${process.env.TWITTER_ACCESS_TOKEN}`,
    ACCESS_TOKEN_SECRET: `${process.env.TWITTER_ACCESS_TOKEN_SECRET}`,
  },
  COUNT: Number(process.env.TWITTER_TWEET_COUNT ?? 100),
};

export const YOUTUBE = {
  API_KEY: `${process.env.YUOTUBE_API_KEY}`,
  COUNT: {
    VIDEO: Number(process.env.YOUTUBE_VIDEO_COUNT ?? 1000),
    COMMENTS: Number(process.env.YOUTUBE_COMMENTS_PER_VIDEO_COUNT ?? 100),
  },
};

export const TIKTOK = {
  ACCESS_TOKEN: `${process.env.TIKTOK_ACCESS_TOKEN}`,
};

export const NEWS = {
  API_KEY: `${process.env.NEWS_API_KEY}`,
};

export const OPENAI = {
  API_KEY: `${process.env.OPENAI_API_KEY}`,
};

export const CONFIG = {
  SCAN_PERIOD_DAYS: Number(process.env.SCAN_PERIOD_DAYS ?? 7),
  STRATEGY_PROVIDER: process.env.STRATEGY_PROVIDER ?? 'afinn',
  SCORE_THRESHOLD: Number(process.env.PROCESS_THRESHOLD ?? 0.3),
};
