import { TIKTOK } from '../constants';
import { Axios } from '../utils/axios';
import { DateRange } from '../types';

export namespace TiktokClient {
  const baseUrl = 'https://api.tiktok.com';
  const apiVersion = 'v1';
  const accessToken = TIKTOK.ACCESS_TOKEN;

  async function getCompanyVideos(company: string, { since, until }: DateRange): Promise<any[]> {
    try {
      const { data } = await Axios.get(`${baseUrl}/${apiVersion}/search/`, {
        params: {
          access_token: accessToken,
          q: company,
          count: 200,
          sort: 'likes',
          start_time: since,
          end_time: until,
          type: 2, // Type 2 means videos
        },
      });

      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  export const getCaptions = async (company: string, timerange: DateRange): Promise<string[]> => {
    const videos = await getCompanyVideos(company, timerange);

    return videos.map(video => video.desc);
  };
}
