import { google } from 'googleapis';
import { DateRange } from '../types';
import { YoutubeClientConfiguration } from './types';

export namespace YoutubeClient {
  export const getSearchResult = async (
    client: ReturnType<typeof google.youtube>,
    company: string,
    { since, until }: DateRange,
    videos: number,
  ): Promise<string | undefined> => {
    const searchResult = await client.search.list({
      part: ['id'],
      q: `${company} video`,
      type: ['video'],
      maxResults: videos,
      publishedAfter: since,
      publishedBefore: until,
    });

    return searchResult.data.items?.map((item: any) => item.id?.videoId).join(',');
  };

  export const getComments = async (
    company: string,
    timerange: DateRange,
    { apiKey, videos = 100, comments = 100 }: YoutubeClientConfiguration,
  ): Promise<string[]> => {
    try {
      const client: ReturnType<typeof google.youtube> =
        google.youtube({
          version: 'v3',
          auth: apiKey,
        });

      const videoIds = await getSearchResult(client, company, timerange, videos);
      if (!videoIds) {
        return [];
      }

      const commentResult = await client.commentThreads.list({
        part: ['snippet'],
        videoId: videoIds,
        maxResults: comments,
      });

      return (commentResult.data.items || []).map((item: any) => item.snippet?.topLevelComment?.snippet?.textDisplay);
    } catch (error) {
      console.error(error);
      return [];
    }
  };
}
