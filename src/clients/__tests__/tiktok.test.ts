import { expect, describe, it, vitest, beforeEach } from 'vitest';
import { Axios } from '../../utils/axios';
import { TiktokClient } from '../tiktok';
import { mockedEmptyVideosCaptions, mockedVideos, mockedVideosCaptions } from './mocks/tiktok';
import { DateRange } from '../../types';
import { omit } from 'lodash';

vitest.mock('../../utils/axios');

const company = 'company';
const timerange: DateRange = { since: '2022-01-01', until: '2022-01-31' };
const configuration = { accessToken: 'aToken', count: 300 };

describe('TikTok.getCaptions', () => {
  beforeEach(() => {
    vitest.clearAllMocks();
  });

  it('should return an array of captions', async () => {
    const mockedAxiosGet = vitest.spyOn(Axios, 'get').mockResolvedValueOnce(mockedVideos);

    const actualCaptions = await TiktokClient.getCaptions(company, timerange, configuration);

    expect(mockedAxiosGet).toHaveBeenCalledTimes(1);
    expect(actualCaptions).toEqual(mockedVideosCaptions);
  });

  it('should return an empty array if no video is found', async () => {
    const mockedAxiosGet = vitest.spyOn(Axios, 'get').mockResolvedValueOnce(mockedEmptyVideosCaptions);

    const actualCaptions = await TiktokClient.getCaptions(company, timerange, omit(configuration, 'count'));

    expect(mockedAxiosGet).toHaveBeenCalledTimes(1);
    expect(actualCaptions).toEqual(mockedEmptyVideosCaptions);
  });

  it('should return an empty array if the TikTok API returns an error', async () => {
    const mockedAxiosGet = vitest.spyOn(Axios, 'get').mockRejectedValueOnce(new Error('API error'));

    const actualCaptions = await TiktokClient.getCaptions(company, timerange, configuration);

    expect(mockedAxiosGet).toHaveBeenCalledTimes(1);
    expect(actualCaptions).toEqual(mockedEmptyVideosCaptions);
  });
});
