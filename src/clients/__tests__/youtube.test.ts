import { expect, describe, it, vitest, beforeEach, Mock } from 'vitest';
import { google } from 'googleapis';
import { DateRange } from '../../types';
import { YoutubeClient } from '../youtube';
import {
  mockedCommentResult, mockedCommentResultWithUndefinedItems,
  mockedEmptyCommentResult,
  mockedEmptySearchResult, mockedEmptyVideoCommentsTexts,
  mockedSearchResult, mockedVideoCommentsTexts,
} from './mocks/youtube';
import { omit } from 'lodash';

vitest.mock('googleapis');

const company = 'test';
const timerange: DateRange = {
  since: '2022-01-01T00:00:00.000Z',
  until: '2022-01-02T00:00:00.000Z',
};
const configuration = {
  apiKey: 'aKey',
  videos: 10,
  comments: 20,
};

// eslint-disable-next-line max-lines-per-function
describe('YoutubeClient', () => {
  beforeEach(() => {
    vitest.clearAllMocks();
  });

  describe('getSearchResult', () => {
    it('should return a comma-separated string of video IDs', async () => {
      const client = { search: { list: vitest.fn().mockResolvedValue(mockedSearchResult) } };
      const videos = configuration.videos;
      const result = await YoutubeClient.getSearchResult(client as any, company, timerange, videos);

      expect(client.search.list).toHaveBeenCalledWith({
        part: ['id'],
        q: `${company} video`,
        type: ['video'],
        maxResults: videos,
        publishedAfter: timerange.since,
        publishedBefore: timerange.until,
      });
      expect(result).toEqual('abc123,def456');
    });

    it('should return an empty string if no video IDs are found', async () => {
      const client = { search: { list: vitest.fn().mockResolvedValue(mockedEmptySearchResult) } };
      const videos = configuration.videos;
      const result = await YoutubeClient.getSearchResult(client as any, company, timerange, videos);

      expect(client.search.list).toHaveBeenCalledWith({
        part: ['id'],
        q: `${company} video`,
        type: ['video'],
        maxResults: videos,
        publishedAfter: timerange.since,
        publishedBefore: timerange.until,
      });
      expect(result).toEqual('');
    });

    it('should catch errors and return an empty string', async () => {
      const client = { search: { list: vitest.fn().mockRejectedValue(new Error('API error')) } };
      const videos = configuration.videos;
      await expect(() => YoutubeClient.getSearchResult(client as any, company, timerange, videos))
        .rejects.toThrowError('API error');

      expect(client.search.list).toHaveBeenCalledWith({
        part: ['id'],
        q: `${company} video`,
        type: ['video'],
        maxResults: videos,
        publishedAfter: timerange.since,
        publishedBefore: timerange.until,
      });
    });
  });

  // eslint-disable-next-line max-lines-per-function
  describe('getComments', () => {
    it('should return an array of comments when the request is successful', async () => {
      const searchResultMock = vitest.fn().mockResolvedValue(mockedSearchResult);
      const commentResultMock = vitest.fn().mockResolvedValue(mockedCommentResult);
      (google.youtube as Mock).mockReturnValue({
        search: {
          list: searchResultMock,
        },
        commentThreads: {
          list: commentResultMock,
        },
      });
      const  { videos, comments } = configuration;

      const result = await YoutubeClient.getComments(company, timerange, configuration);

      expect(searchResultMock).toHaveBeenCalledTimes(1);
      expect(searchResultMock).toHaveBeenCalledWith({
        part: ['id'],
        q: `${company} video`,
        type: ['video'],
        maxResults: videos,
        publishedAfter: timerange.since,
        publishedBefore: timerange.until,
      });

      expect(commentResultMock).toHaveBeenCalledTimes(1);
      expect(commentResultMock).toHaveBeenCalledWith({
        part: ['snippet'],
        videoId: 'abc123,def456',
        maxResults: comments,
      });

      expect(result).toEqual(mockedVideoCommentsTexts);
    });

    it.each([mockedEmptyCommentResult, mockedCommentResultWithUndefinedItems])
    ('should return an empty array when there are no comments', async (mockedComments) => {
      const searchResultMock = vitest.fn().mockResolvedValue(mockedSearchResult);
      const commentResultMock = vitest.fn().mockResolvedValue(mockedComments);
      (google.youtube as Mock).mockReturnValue({
        search: {
          list: searchResultMock,
        },
        commentThreads: {
          list: commentResultMock,
        },
      });

      const result = await YoutubeClient.getComments(company, timerange, omit(configuration, ['videos', 'comments']));

      expect(searchResultMock).toHaveBeenCalledTimes(1);
      expect(searchResultMock).toHaveBeenCalledWith({
        part: ['id'],
        q: `${company} video`,
        type: ['video'],
        maxResults: 100,
        publishedAfter: timerange.since,
        publishedBefore: timerange.until,
      });

      expect(commentResultMock).toHaveBeenCalledTimes(1);
      expect(commentResultMock).toHaveBeenCalledWith({
        part: ['snippet'],
        videoId: 'abc123,def456',
        maxResults: 100,
      });

      expect(result).toEqual(mockedEmptyVideoCommentsTexts);
    });

    it('should return an empty array when the search result is empty', async () => {
      const searchResultMock = vitest.fn().mockResolvedValue(mockedEmptySearchResult);
      (google.youtube as Mock).mockReturnValue({
        search: {
          list: searchResultMock,
        },
        commentThreads: {
          list: vitest.fn(),
        },
      });
      const { videos } = configuration;

      const result = await YoutubeClient.getComments(company, timerange, configuration);

      expect(searchResultMock).toHaveBeenCalledTimes(1);
      expect(searchResultMock).toHaveBeenCalledWith({
        part: ['id'],
        q: `${company} video`,
        type: ['video'],
        maxResults: videos,
        publishedAfter: timerange.since,
        publishedBefore: timerange.until,
      });

      expect(result).toEqual(mockedEmptyVideoCommentsTexts);
    });

    it('should return an empty array when there is an error', async () => {
      const error = new Error('test error');
      const searchResultMock = vitest.fn().mockRejectedValue(error);
      (google.youtube as Mock).mockReturnValue({
        search: {
          list: searchResultMock,
        },
        commentThreads: {
          list: vitest.fn(),
        },
      });
      const { videos } = configuration;

      const result = await YoutubeClient.getComments(company, timerange, configuration);

      expect(searchResultMock).toHaveBeenCalledTimes(1);
      expect(searchResultMock).toHaveBeenCalledWith({
        part: ['id'],
        q: `${company} video`,
        type: ['video'],
        maxResults: videos,
        publishedAfter: timerange.since,
        publishedBefore: timerange.until,
      });

      expect(result).toEqual(mockedEmptyVideoCommentsTexts);
    });
  });
});
