import { ProviderFunctionType, MediaType } from '../types';
import { cond, constant, stubTrue } from 'lodash';
import { analyze as facebookAnalyze } from './facebook';
import { analyze as instagramAnalyze } from './instagram';
import { analyze as twitterAnalyze } from './twitter';
import { analyze as youtubeAnalyze } from './youtube';
import { analyze as newsAnalyze } from './news';
import { analyze as tiktokAnalyze } from './tiktok';

const isFacebook = (media: MediaType): boolean => media === 'facebook';
const isInstagram = (media: MediaType): boolean => media === 'instagram';
const isNews = (media: MediaType): boolean => media === 'news';
const isTwitter = (media: MediaType): boolean => media === 'twitter';
const isYoutube = (media: MediaType): boolean => media === 'youtube';
const isTiktok = (media: MediaType): boolean => media === 'tiktok';

export const sentimentMediaFactory = (media: MediaType): ProviderFunctionType => {
  const provider = cond<MediaType, ProviderFunctionType>([
    [isFacebook, constant<ProviderFunctionType>(facebookAnalyze)],
    [isInstagram, constant<ProviderFunctionType>(instagramAnalyze)],
    [isNews, constant<ProviderFunctionType>(newsAnalyze)],
    [isTiktok, constant<ProviderFunctionType>(tiktokAnalyze)],
    [isTwitter, constant<ProviderFunctionType>(twitterAnalyze)],
    [isYoutube, constant<ProviderFunctionType>(youtubeAnalyze)],
    [stubTrue, () => {
      throw new Error('Invalid media provider');
    }],
  ]);

  return provider(media);
};
