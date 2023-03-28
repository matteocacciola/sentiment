import { TIKTOK } from '../constants';
import { Axios } from '../utils/axios';
import { DateRange } from '../types';

export namespace TiktokClient {
  const baseUrl = 'https://api.tiktok.com';
  const apiVersion = 'v1';
  const accessToken = TIKTOK.ACCESS_TOKEN;

  async function getCompanyVideos(company: string, { since, until }: DateRange, count: number): Promise<any[]> {
    try {
      const { videos } = await Axios.get(`${baseUrl}/${apiVersion}/search/`, {
        params: {
          access_token: accessToken,
          q: company,
          count,
          sort: 'likes',
          start_time: since,
          end_time: until,
          type: 2, // Type 2 means videos
        },
      });

      return videos;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  export const getCaptions = async (company: string, timerange: DateRange, count: number): Promise<string[]> => {
    const videos = await getCompanyVideos(company, timerange, count);
    if (!videos) {
      return [];
    }

    return videos.map(video => `${video.desc ?? video.video_description} ${video.voice_to_text ?? ''}`.trim());
  };
}
