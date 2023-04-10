import { Axios } from '../utils/axios';
import { DateRange } from '../types';
import { InstagramClientConfiguration } from './types';

export namespace InstagramClient {
  const baseUrl = 'https://graph.instagram.com/media';

  export const getInsta = async (
    company: string,
    { since, until }: DateRange,
    { accessToken }: InstagramClientConfiguration,
  ): Promise<string[]> => {
    try {
      const data = await Axios.get(baseUrl, {
        fields: 'caption,id,media_type,permalink,timestamp,username',
        access_token: accessToken,
        q: company,
        since,
        until,
      });

      return data.map((insta: any) => insta.caption);
    } catch (error) {
      console.error(error);
      return [];
    }
  };
}
