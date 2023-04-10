import { expect, describe, it, vitest, beforeEach, SpyInstance } from 'vitest';
import * as getCompanyMediaSentiment from '../../helpers/getCompanyMediaSentiment';
import { mediaSentiment } from '../media-sentiment';
import { DateRange, SentimentConfigurationType } from '../../types';
import { mockedGetCompanyMediaSentimentResult } from './mocks/media-sentiment';

const mockedGetCompanyMediaSentiment: SpyInstance = vitest.spyOn(getCompanyMediaSentiment, 'getCompanyMediaSentiment');
const company: string = 'test company';
const configuration: SentimentConfigurationType = {
  openai: { apiKey: 'testOpenAiApiKey' },
};
const media: string[] = ['facebook', 'instagram', 'news', 'tiktok', 'twitter', 'youtube'];
const now: string = '2023-01-01T00:00:00.000Z';

vitest.useFakeTimers().setSystemTime(new Date(now));

beforeEach(() => {
  vitest.clearAllMocks();
});

describe('mediaSentiment', () => {
  it('returns null items when getCompanyMediaSentiment returns null for media', async () => {
    mockedGetCompanyMediaSentiment.mockResolvedValue(null);

    const result = await mediaSentiment(company, media, configuration);
    const expectedResult = media.map((medium) => ({ [medium]: null }));

    expect(mockedGetCompanyMediaSentiment).toHaveBeenCalledTimes(media.length);
    expect(mockedGetCompanyMediaSentiment).toHaveBeenLastCalledWith(
      company,
      'youtube',
      { since: '2022-12-25T00:00:00.000Z', until: '2023-01-01T00:00:00.000Z' },
      configuration,
      'afinn',
      0.3,
      undefined,
    );
    expect(result).toStrictEqual(expectedResult);
  });

  it('calculates the results when getCompanyMediaSentiment returns non null elements', async () => {
    const timerange: DateRange = { since: '2022-12-25T00:00:00.000Z', until: '2023-01-01T00:00:00.000Z' };
    const expectedSingleResult = mockedGetCompanyMediaSentimentResult(timerange);
    const expectedResult = media.map((medium) => ({ [medium]: expectedSingleResult }));

    mockedGetCompanyMediaSentiment.mockResolvedValue(expectedSingleResult);

    const result = await mediaSentiment(company, media, configuration);

    expect(mockedGetCompanyMediaSentiment).toHaveBeenCalledTimes(media.length);
    expect(mockedGetCompanyMediaSentiment).toHaveBeenLastCalledWith(
      company,
      'youtube',
      timerange,
      configuration,
      'afinn',
      0.3,
      undefined,
    );
    expect(result).toStrictEqual(expectedResult);
  });
});
