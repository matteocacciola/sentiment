import { expect, describe, it, vitest, beforeEach, SpyInstance } from 'vitest';
import { Axios } from '../../utils/axios';
import { InstagramClient } from '../instagram';
import { mockedEmptyInstaTexts, mockedInstaTexts, mockedSearchInsta } from './mocks/instagram';
import { DateRange } from '../../types';

vitest.mock('../../utils/axios');
const mockedAxiosGet: SpyInstance = vitest.spyOn(Axios, 'get');

const company = 'company';
const timerange: DateRange = { since: '2022-01-01', until: '2022-01-31' };
const configuration = { accessToken: 'aToken' };

describe('InstagramClient.getInsta', () => {
  beforeEach(() => {
    vitest.clearAllMocks();
  });

  it('should return an array of posts', async () => {
    mockedAxiosGet.mockResolvedValueOnce(mockedSearchInsta);

    const actualPosts = await InstagramClient.getInsta(company, timerange, configuration);

    expect(mockedAxiosGet).toHaveBeenCalledTimes(1);
    expect(actualPosts).toEqual(mockedInstaTexts);
  });

  it('should return an empty array if no post is found', async () => {
    mockedAxiosGet.mockResolvedValueOnce(mockedEmptyInstaTexts);

    const actualPosts = await InstagramClient.getInsta(company, timerange, configuration);

    expect(mockedAxiosGet).toHaveBeenCalledTimes(1);
    expect(actualPosts).toEqual(mockedEmptyInstaTexts);
  });

  it('should throw an error if the Instagram API returns an error', async () => {
    mockedAxiosGet.mockRejectedValueOnce(new Error('API error'));

    const actualPosts = await InstagramClient.getInsta(company, timerange, configuration);

    expect(mockedAxiosGet).toHaveBeenCalledTimes(1);
    expect(actualPosts).toEqual(mockedEmptyInstaTexts);
  });
});
