export const mockedSearchResult = {
  data: {
    items: [
      {
        id: { videoId: 'abc123' },
      },
      {
        id: { videoId: 'def456' },
      },
    ],
  },
};
export const mockedEmptySearchResult = {
  data: {
    items: [],
  },
};

export const mockedCommentResult = {
  data: {
    items: [
      {
        snippet: {
          topLevelComment: {
            snippet: {
              textDisplay: 'Test comment 1',
            },
          },
        },
      },
      {
        snippet: {
          topLevelComment: {
            snippet: {
              textDisplay: 'Test comment 2',
            },
          },
        },
      },
    ],
  },
};
export const mockedEmptyCommentResult = {
  data: {
    items: [],
  },
};
export const mockedCommentResultWithUndefinedItems = {
  data: {},
};
export const mockedVideoCommentsTexts = ['Test comment 1', 'Test comment 2'];
export const mockedEmptyVideoCommentsTexts = [];
