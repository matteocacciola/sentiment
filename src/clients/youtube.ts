import { google } from 'googleapis';
import { YOUTUBE } from '../constants';
import { DateRange } from '../types';

export namespace YoutubeClient {
  const get = (): ReturnType<typeof google.youtube> =>
    google.youtube({
      version: 'v3',
      auth: YOUTUBE.API_KEY,
    });

  export const getComments = async (
    company: string,
    { since, until }: DateRange,
    videoCount = YOUTUBE.COUNT.VIDEO,
    commentsCount = YOUTUBE.COUNT.COMMENTS,
  ): Promise<string[]> => {
    const client = get();

    const searchResult = await client.search.list({
      part: ['id'],
      q: `${company} video`,
      type: ['video'],
      maxResults: videoCount,
      publishedAfter: since,
      publishedBefore: until,
    });

    const videoIds = searchResult.data.items?.map((item: any) => item.id?.videoId).join(',');
    const commentResult = await client.commentThreads.list({
      part: ['snippet'],
      videoId: videoIds,
      maxResults: commentsCount,
    });

    const comments: string[] = [];
    commentResult.data.items?.forEach((item: any) => {
      const comment = item.snippet?.topLevelComment?.snippet;
      if (comment) {
        comments.push(comment.textDisplay!);
      }
    });

    return comments;
  };
}
