import { expect, describe, it, vitest, beforeEach } from 'vitest';
import { Axios } from '../../utils/axios';
import { InstagramClient } from '../instagram';
import { mockedEmptyInstaTexts, mockedInstaTexts, mockedSearchInsta } from './mocks/instagram';
import { DateRange } from '../../types';

vitest.mock('../../utils/axios');

const company = 'company';
const timerange: DateRange = { since: '2022-01-01', until: '2022-01-31' };

describe('InstagramClient.getInsta', () => {
  beforeEach(() => {
    vitest.clearAllMocks();
  });

  it('should return an array of posts', async () => {
    const mockedAxiosGet = vitest.spyOn(Axios, 'get').mockResolvedValueOnce(mockedSearchInsta);

    const actualPosts = await InstagramClient.getInsta(company, timerange);

    expect(mockedAxiosGet).toHaveBeenCalledTimes(1);
    expect(actualPosts).toEqual(mockedInstaTexts);
  });

  it('should return an empty array if no post is found', async () => {
    const mockedAxiosGet = vitest.spyOn(Axios, 'get').mockResolvedValueOnce(mockedEmptyInstaTexts);

    const actualPosts = await InstagramClient.getInsta(company, timerange);

    expect(mockedAxiosGet).toHaveBeenCalledTimes(1);
    expect(actualPosts).toEqual(mockedEmptyInstaTexts);
  });

  it('should throw an error if the Instagram API returns an error', async () => {
    const mockedAxiosGet = vitest.spyOn(Axios, 'get').mockRejectedValueOnce(new Error('API error'));

    const actualPosts = await InstagramClient.getInsta(company, timerange);

    expect(mockedAxiosGet).toHaveBeenCalledTimes(1);
    expect(actualPosts).toEqual(mockedEmptyInstaTexts);
  });
});
