import { TwitterApi } from 'twitter-api-v2';
import { TWITTER } from '../constants';
import { DateRange } from '../types';

export namespace TwitterClient {
  const twitterConfig = {
    appKey: TWITTER.CONFIG.APP_KEY,
    appSecret: TWITTER.CONFIG.APP_SECRET,
    accessToken: TWITTER.CONFIG.ACCESS_TOKEN,
    accessSecret: TWITTER.CONFIG.ACCESS_TOKEN_SECRET,
  };

  export const getTweets = async (company: string, { since, until }: DateRange ): Promise<any> => {
    const client = new TwitterApi(twitterConfig);
    await client.appLogin();

    const { data } = await client.v2.get('tweets/search/recent', {
      query: company,
      max_results: TWITTER.COUNT,
      start_time: since,
      end_time: until,
      fields: 'text',
    });

    return data;
  };
}
