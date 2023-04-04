import { Axios } from '../utils/axios';
import { DateRange } from '../types';
import { TiktokClientType } from './types';

export namespace TiktokClient {
  const baseUrl = 'https://api.tiktok.com';
  const apiVersion = 'v1';

  async function getCompanyVideos(
    company: string,
    { since, until }: DateRange,
    { accessToken, videos: count = 200 }: TiktokClientType,
  ): Promise<any[]> {
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

  export const getCaptions = async (
    company: string,
    timerange: DateRange,
    configuration: TiktokClientType,
  ): Promise<string[]> => {
    const videos = await getCompanyVideos(company, timerange, configuration);
    if (!videos) {
      return [];
    }

    return videos.map(video => `${video.desc ?? video.video_description} ${video.voice_to_text ?? ''}`.trim());
  };
}
