import { expect, describe, it, vitest, beforeEach } from 'vitest';
import { Axios } from '../../utils/axios';
import { FacebookClient } from '../facebook';
import { mockedEmptyPostTexts, mockedPostTexts, mockedSearchPosts } from './mocks/facebook';
import { DateRange } from '../../types';

vitest.mock('../../utils/axios');

const company = 'company';
const timerange: DateRange = { since: '2022-01-01', until: '2022-01-31' };

describe('FacebookClient.getPosts', () => {
  beforeEach(() => {
    vitest.clearAllMocks();
  });

  it('should return an array of posts', async () => {
    const mockedAxiosGet = vitest.spyOn(Axios, 'get').mockResolvedValueOnce(mockedSearchPosts);

    const actualPosts = await FacebookClient.getPosts(company, timerange);

    expect(mockedAxiosGet).toHaveBeenCalledTimes(1);
    expect(actualPosts).toEqual(mockedPostTexts);
  });

  it('should return an empty array if no post is found', async () => {
    const mockedAxiosGet = vitest.spyOn(Axios, 'get').mockResolvedValueOnce(mockedEmptyPostTexts);

    const actualPosts = await FacebookClient.getPosts(company, timerange);

    expect(mockedAxiosGet).toHaveBeenCalledTimes(1);
    expect(actualPosts).toEqual(mockedEmptyPostTexts);
  });

  it('should throw an error if the Facebook API returns an error', async () => {
    const mockedAxiosGet = vitest.spyOn(Axios, 'get').mockRejectedValueOnce(new Error('API error'));

    const actualPosts = await FacebookClient.getPosts(company, timerange);

    expect(mockedAxiosGet).toHaveBeenCalledTimes(1);
    expect(actualPosts).toEqual(mockedEmptyPostTexts);
  });
});
