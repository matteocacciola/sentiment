import { Axios } from '../utils/axios';
import { DateRange } from '../types';
import { FacebookClientType } from './types';

export namespace FacebookClient {
  const baseUrl = 'https://graph.facebook.com/search';

  export const getPosts = async (
    company: string,
    { since, until }: DateRange,
    { accessToken }: FacebookClientType,
  ): Promise<string[]> => {
    try {
      const data = await Axios.get(baseUrl, {
        q: company,
        type: 'post',
        fields: 'message,created_time',
        access_token: accessToken,
        since,
        until,
      });

      return data.map((post: any) => post.message);
    } catch (error) {
      console.error(error);
      return [];
    }
  };
}
