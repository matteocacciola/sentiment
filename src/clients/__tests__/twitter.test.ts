import { expect, describe, it, vitest, beforeEach, Mock } from 'vitest';
import { TwitterApi } from 'twitter-api-v2';
import { TwitterClient } from '../twitter';
import { DateRange } from '../../types';
import { mockedData, mockedDataTexts, mockedEmptyData } from './mocks/twitter';

vitest.mock('twitter-api-v2');

const company = 'test company';
const timerange: DateRange = {
  since: '2022-01-01T00:00:00.000Z',
  until: '2022-01-02T00:00:00.000Z',
};
const count = 100;

describe('TwitterClient', () => {
  describe('getTweets', () => {
    beforeEach(() => {
      vitest.clearAllMocks();
    });

    it('should return tweets when successful', async () => {
      const client = {
        appLogin: vitest.fn(),
        v2: {
          get: vitest.fn().mockResolvedValue(mockedData),
        },
      };
      (TwitterApi as unknown as Mock).mockImplementation(() => client);

      const result = await TwitterClient.getTweets(company, timerange, count);

      expect(client.appLogin).toHaveBeenCalledTimes(1);
      expect(client.v2.get).toHaveBeenCalledTimes(1);
      expect(client.v2.get).toHaveBeenCalledWith('tweets/search/recent', {
        query: company,
        max_results: count,
        start_time: timerange.since,
        end_time: timerange.until,
        fields: 'text',
      });

      expect(result).toEqual(mockedDataTexts);
    });

    it('should return an empty array when there are no tweets', async () => {
      const client = {
        appLogin: vitest.fn(),
        v2: {
          get: vitest.fn().mockResolvedValue(mockedEmptyData),
        },
      };
      (TwitterApi as unknown as Mock).mockImplementation(() => client);

      const result = await TwitterClient.getTweets(company, timerange, count);

      expect(result).toEqual([]);
    });

    it('should return an empty array when there is an error', async () => {
      const error = new Error('test error');
      const client = {
        appLogin: vitest.fn(),
        v2: {
          get: vitest.fn().mockRejectedValue(error),
        },
      };
      (TwitterApi as unknown as Mock).mockImplementation(() => client);

      const result = await TwitterClient.getTweets(company, timerange, count);

      expect(result).toEqual([]);
    });
  });
});
