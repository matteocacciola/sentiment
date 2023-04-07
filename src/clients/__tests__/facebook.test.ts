import { expect, describe, it, vitest, beforeEach, SpyInstance } from 'vitest';
import { Axios } from '../../utils/axios';
import { FacebookClient } from '../facebook';
import { mockedEmptyPostTexts, mockedPostTexts, mockedSearchPosts } from './mocks/facebook';
import { DateRange } from '../../types';

vitest.mock('../../utils/axios');

const mockedAxiosGet: SpyInstance = vitest.spyOn(Axios, 'get');

const company = 'company';
const timerange: DateRange = { since: '2022-01-01', until: '2022-01-31' };
const configuration = { accessToken: 'aToken' };

describe('FacebookClient.getPosts', () => {
  beforeEach(() => {
    vitest.clearAllMocks();
  });

  it('should return an array of posts', async () => {
    mockedAxiosGet.mockResolvedValueOnce(mockedSearchPosts);

    const actualPosts = await FacebookClient.getPosts(company, timerange, configuration);

    expect(mockedAxiosGet).toHaveBeenCalledTimes(1);
    expect(actualPosts).toEqual(mockedPostTexts);
  });

  it('should return an empty array if no post is found', async () => {
    mockedAxiosGet.mockResolvedValueOnce(mockedEmptyPostTexts);

    const actualPosts = await FacebookClient.getPosts(company, timerange, configuration);

    expect(mockedAxiosGet).toHaveBeenCalledTimes(1);
    expect(actualPosts).toEqual(mockedEmptyPostTexts);
  });

  it('should throw an error if the Facebook API returns an error', async () => {
    mockedAxiosGet.mockRejectedValueOnce(new Error('API error'));

    const actualPosts = await FacebookClient.getPosts(company, timerange, configuration);

    expect(mockedAxiosGet).toHaveBeenCalledTimes(1);
    expect(actualPosts).toEqual(mockedEmptyPostTexts);
  });
});
