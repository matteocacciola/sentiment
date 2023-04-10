import { expect, describe, it, vitest, beforeEach } from 'vitest';
import { DateRange, MediaType } from '../../types';
import { ScoresEvaluatorStrategy } from '../../strategies/types';
import { FacebookClient } from '../../clients/facebook';
import { InstagramClient } from '../../clients/instagram';
import { NewsClient } from '../../clients/news';
import { TiktokClient } from '../../clients/tiktok';
import { TwitterClient } from '../../clients/twitter';
import { YoutubeClient } from '../../clients/youtube';
import { mockedPostTexts } from '../../clients/__tests__/mocks/facebook';
import { getCompanyMediaSentiment } from '../getCompanyMediaSentiment';
import { OpenAI } from '../../utils/openai';
import { mockedInstaTexts } from '../../clients/__tests__/mocks/instagram';
import { mockedNewsTexts } from '../../clients/__tests__/mocks/news';
import { mockedVideosCaptions } from '../../clients/__tests__/mocks/tiktok';
import { mockedDataTexts } from '../../clients/__tests__/mocks/twitter';
import { mockedVideoCommentsTexts } from '../../clients/__tests__/mocks/youtube';

const company: string = 'company';
const timerange: DateRange = { since: '2022-01-01', until: '2022-01-31' };
const strategyType: ScoresEvaluatorStrategy = 'afinn';
const scoreThreshold = 0.3;

const mockedOpenAISummary: string = 'This is a summary from ChatGPT';
const now: string = '2023-01-01T00:00:00.000Z';
const errorConfiguration = { openai: { apiKey: 'aToken' } };
const successConfiguration = {
  ...errorConfiguration,
  facebook: { accessToken: 'aToken' },
  instagram: { accessToken: 'aToken' },
  news: { apiKey: 'aKey' },
  tiktok: { accessToken: 'aToken', count: 300 },
  twitter: {
    appKey: 'aKey',
    appSecret: 'aSecret',
    accessToken: 'aToken',
    accessSecret: 'anotherSecret',
    tweets: 1000,
  },
  youtube: {
    apiKey: 'aKey',
    videos: 10,
    comments: 20,
  },
};

vitest.useFakeTimers().setSystemTime(new Date(now));
vitest.spyOn(OpenAI, 'getSummary').mockResolvedValue(mockedOpenAISummary);

const getResults = async (
  media: MediaType,
  mockedElements: string[],
  module: any,
  methodName: string,
  configuration: any,
) => {
  vitest.spyOn(module, methodName).mockResolvedValue(mockedElements);

  const result = await getCompanyMediaSentiment(
    company,
    media,
    timerange,
    configuration,
    strategyType,
    scoreThreshold,
  );
  const expectedAnalyzedElements = mockedElements.map((text, index) => {
    const { score, category } = result!.analyzedElements[index];
    return { text, score, category };
  });
  return { result, expectedAnalyzedElements };
};

describe('getCompanyMediaSentiment', () => {
  beforeEach(() => {
    vitest.clearAllMocks();
  });

  it('get with empty results from provider', async () => {
    vitest.spyOn(FacebookClient, 'getPosts').mockResolvedValueOnce([]);
    const result = await getCompanyMediaSentiment(
      company,
      'facebook',
      timerange,
      { facebook: { accessToken: 'aToken' }, openai: { apiKey: 'aToken' } },
      strategyType,
      scoreThreshold,
    );

    expect(result).toBeNull();
  });

  it.each([
    ['facebook', 'Facebook', mockedPostTexts, FacebookClient, 'getPosts'],
    ['instagram', 'Instagram', mockedInstaTexts, InstagramClient, 'getInsta'],
    ['news', 'NewsAPI', mockedNewsTexts, NewsClient, 'getNews'],
    ['tiktok', 'TikTok', mockedVideosCaptions, TiktokClient, 'getCaptions'],
    ['twitter', 'Twitter', mockedDataTexts, TwitterClient, 'getTweets'],
    ['youtube', 'YouTube', mockedVideoCommentsTexts, YoutubeClient, 'getComments'],
  ])(
    'get error with "%s" as provider and missing configuration',
    async (media, error, mockedElements, module, method) => {
      await expect(getResults(media as MediaType, mockedElements, module, method, errorConfiguration))
        .rejects.toEqual(new Error(`Invalid ${error} configuration`));
    },
  );

  it.each([
    ['facebook', mockedPostTexts, FacebookClient, 'getPosts'],
    ['instagram', mockedInstaTexts, InstagramClient, 'getInsta'],
    ['news', mockedNewsTexts, NewsClient, 'getNews'],
    ['tiktok', mockedVideosCaptions, TiktokClient, 'getCaptions'],
    ['twitter', mockedDataTexts, TwitterClient, 'getTweets'],
    ['youtube', mockedVideoCommentsTexts, YoutubeClient, 'getComments'],
  ])('get with "%s" as provider', async (media, mockedElements, module, method) => {
    const { result, expectedAnalyzedElements } = await getResults(
      media as MediaType,
      mockedElements,
      module,
      method,
      successConfiguration,
    );
    const { positive, negative, neutral } = result!;

    expect(result).toEqual(expect.objectContaining({
      analyzedElements: expectedAnalyzedElements,
      summary: mockedOpenAISummary,
      timeRange: { from: timerange.since, to: timerange.until },
      analyzedAt: now,
    }));
    expect(positive).toBeTypeOf('number');
    expect(negative).toBeTypeOf('number');
    expect(neutral).toBeTypeOf('number');
  },
  );
});
