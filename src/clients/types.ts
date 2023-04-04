import { WithRequiredAndNotNullProperty } from '../types';

type AccessTokenConfigurationType = {
  accessToken: string;
  accessSecret?: string;
};
type ApiKeyConfigurationType = {
  apiKey: string;
};
type AppKeyConfigurationType = {
  appKey: string;
  appSecret: string;
};

export type FacebookClientType = AccessTokenConfigurationType;
export type InstagramClientType = AccessTokenConfigurationType;
export type NewsClientType = ApiKeyConfigurationType;
export type TiktokClientType = AccessTokenConfigurationType & { videos?: number; };
export type TwitterClientType = AppKeyConfigurationType &
  WithRequiredAndNotNullProperty<AccessTokenConfigurationType, 'accessSecret'> &
  { tweets?: number };
export type YoutubeClientType = ApiKeyConfigurationType & { videos?: number; comments?: number; };
export type OpenAiClientType = ApiKeyConfigurationType;
