import process from 'process';

export const FACEBOOK = {
  ACCESS_TOKEN: `${process.env.FACEBOOK_ACCESS_TOKEN}`,
};

export const INSTAGRAM = {
  ACCESS_TOKEN: `${process.env.INSTAGRAM_ACCESS_TOKEN}`,
};

export const TWITTER = {
  APP_KEY: `${process.env.TWITTER_APP_KEY}`,
  APP_SECRET: `${process.env.TWITTER_APP_SECRET}`,
  ACCESS_TOKEN: `${process.env.TWITTER_ACCESS_TOKEN}`,
  ACCESS_TOKEN_SECRET: `${process.env.TWITTER_ACCESS_TOKEN_SECRET}`,
};

export const YOUTUBE = {
  API_KEY: `${process.env.YUOTUBE_API_KEY}`,
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
  MEDIA_ENABLED: process.env.SENTIMENT_MEDIA_ENABLED,
  SCAN_PERIOD_DAYS: Number(process.env.SENTIMENT_SCAN_PERIOD_DAYS ?? 7),
  STRATEGY_PROVIDER: process.env.SENTIMENT_STRATEGY_PROVIDER ?? 'afinn',
  SCORE_THRESHOLD: Number(process.env.SENTIMENT_PROCESS_THRESHOLD ?? 0.3),
  TWITTER: {
    COUNT: Number(process.env.SENTIMENT_TWITTER_TWEET_COUNT ?? 100),
  },
  YOUTUBE: {
    COUNT: {
      VIDEO: Number(process.env.SENTIMENT_YOUTUBE_VIDEO_COUNT ?? 1000),
      COMMENTS: Number(process.env.SENTIMENT_YOUTUBE_COMMENTS_PER_VIDEO_COUNT ?? 100),
    },
  },
  TIKTOK: {
    COUNT: Number(process.env.SENTIMENT_TIKTOK_VIDEO_COUNT ?? 200),
  },
};
