import { TwitterApi } from 'twitter-api-v2';
import { TWITTER } from '../constants';
import { DateRange } from '../types';

export namespace TwitterClient {
  const twitterConfig = {
    appKey: TWITTER.APP_KEY,
    appSecret: TWITTER.APP_SECRET,
    accessToken: TWITTER.ACCESS_TOKEN,
    accessSecret: TWITTER.ACCESS_TOKEN_SECRET,
  };

  export const getTweets = async (company: string, { since, until }: DateRange, count: number ): Promise<any> => {
    try {
      const client = new TwitterApi(twitterConfig);
      await client.appLogin();

      const { data } = await client.v2.get('tweets/search/recent', {
        query: company,
        max_results: count,
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
