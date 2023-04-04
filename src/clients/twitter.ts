import { TwitterApi } from 'twitter-api-v2';
import { DateRange } from '../types';
import { omit } from 'lodash';
import { TwitterClientType } from './types';

export namespace TwitterClient {
  export const getTweets = async (
    company: string,
    { since, until }: DateRange,
    configuration: TwitterClientType,
  ): Promise<any> => {
    try {
      const client = new TwitterApi(omit(configuration, 'tweets'));
      await client.appLogin();

      const { data } = await client.v2.get('tweets/search/recent', {
        query: company,
        max_results: configuration.tweets ?? 100,
        start_time: since,
        end_time: until,
        fields: 'text',
      });

      return data.map((tweet: any) => tweet.text);
    } catch (error) {
      console.error(error);
      return [];
    }
  };
}
