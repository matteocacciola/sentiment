import { expect, describe, it, vitest, beforeEach } from 'vitest';
import { Axios } from '../../utils/axios';
import { NewsClient } from '../news';
import { mockedEmptyNewsTexts, mockedNews, mockedNewsTexts } from './mocks/news';
import { DateRange } from '../../types';

vitest.mock('../../utils/axios');

const company = 'company';
const timerange: DateRange = { since: '2022-01-01', until: '2022-01-31' };
const configuration = { apiKey: 'aKey' };

describe('NewsClient.getNews', () => {
  beforeEach(() => {
    vitest.clearAllMocks();
  });

  it('should return an array of news', async () => {
    const mockedAxiosGet = vitest.spyOn(Axios, 'get').mockResolvedValueOnce(mockedNews);

    const actualNews = await NewsClient.getNews(company, timerange, configuration);

    expect(mockedAxiosGet).toHaveBeenCalledTimes(1);
    expect(actualNews).toEqual(mockedNewsTexts);
  });

  it('should return an empty array if no result is found', async () => {
    const mockedAxiosGet = vitest.spyOn(Axios, 'get').mockResolvedValueOnce(mockedEmptyNewsTexts);

    const actualNews = await NewsClient.getNews(company, timerange, configuration);

    expect(mockedAxiosGet).toHaveBeenCalledTimes(1);
    expect(actualNews).toEqual(mockedEmptyNewsTexts);
  });

  it('should throw an error if the News API returns an error', async () => {
    const mockedAxiosGet = vitest.spyOn(Axios, 'get').mockRejectedValueOnce(new Error('API error'));

    const actualNews = await NewsClient.getNews(company, timerange, configuration);

    expect(mockedAxiosGet).toHaveBeenCalledTimes(1);
    expect(actualNews).toEqual(mockedEmptyNewsTexts);
  });
});
