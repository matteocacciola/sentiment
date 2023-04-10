import { WithRequiredAndNotNullProperty } from '../types';

type AccessTokenConfiguration = {
  accessToken: string;
  accessSecret?: string;
};
type ApiKeyConfiguration = {
  apiKey: string;
};
type AppKeyConfiguration = {
  appKey: string;
  appSecret: string;
};

export type FacebookClientConfiguration = AccessTokenConfiguration;
export type InstagramClientConfiguration = AccessTokenConfiguration;
export type NewsClientConfiguration = ApiKeyConfiguration;
export type TiktokClientConfiguration = AccessTokenConfiguration & { videos?: number; };
export type TwitterClientConfiguration = AppKeyConfiguration &
  WithRequiredAndNotNullProperty<AccessTokenConfiguration, 'accessSecret'> &
  { tweets?: number };
export type YoutubeClientConfiguration = ApiKeyConfiguration & { videos?: number; comments?: number; };
export type OpenAIClientConfiguration = ApiKeyConfiguration;
