import { FACEBOOK } from '../constants';
import { Axios } from '../utils/axios';
import { DateRange } from '../types';

export namespace FacebookClient {
  const baseUrl = 'https://graph.facebook.com/search';
  const accessToken = FACEBOOK.ACCESS_TOKEN;

  export const getPosts = async (company: string, { since, until }: DateRange): Promise<string[]> => {
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
