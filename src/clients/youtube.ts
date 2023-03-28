import { google } from 'googleapis';
import { YOUTUBE } from '../constants';
import { DateRange } from '../types';

export namespace YoutubeClient {
  export const getSearchResult = async (
    client: ReturnType<typeof google.youtube>,
    company: string,
    { since, until }: DateRange,
    videoCount: number,
  ) => {
    const searchResult = await client.search.list({
      part: ['id'],
      q: `${company} video`,
      type: ['video'],
      maxResults: videoCount,
      publishedAfter: since,
      publishedBefore: until,
    });

    return searchResult.data.items?.map((item: any) => item.id?.videoId).join(',');
  };

  export const getComments = async (
    company: string,
    timerange: DateRange,
    videoCount: number,
    commentsCount: number,
  ): Promise<string[]> => {
    try {
      const client: ReturnType<typeof google.youtube> =
        google.youtube({
          version: 'v3',
          auth: YOUTUBE.API_KEY,
        });

      const videoIds = await getSearchResult(client, company, timerange, videoCount);
      if (!videoIds) {
        return [];
      }

      const commentResult = await client.commentThreads.list({
        part: ['snippet'],
        videoId: videoIds,
        maxResults: commentsCount,
      });

      return (commentResult.data.items || []).map((item: any) => item.snippet?.topLevelComment?.snippet?.textDisplay);
    } catch (error) {
      console.error(error);
      return [];
    }
  };
}
