import { expect, describe, it, vitest, afterEach, Mock, afterAll } from 'vitest';
import { LanguageServiceClient } from '@google-cloud/language';
import strategy from '../google';
import { SENTIMENTS } from '../types';

afterAll(() => {
  vitest.resetAllMocks();
});

vitest.mock('@google-cloud/language', () => ({
  LanguageServiceClient: vitest.fn().mockImplementation(() => ({
    analyzeSentiment: vitest.fn().mockResolvedValue([
      {
        documentSentiment: {
          score: 0.25,
        },
      },
    ]),
  })),
}));

describe('Google Cloud evaluateScores', () => {
  afterEach(() => {
    vitest.clearAllMocks();
  });

  const company = 'Google';
  const items = ['This is great!', 'This is bad!', 'This is neutral.'];
  const scoreThreshold = 0.5;

  it('should evaluate sentiment scores of all items using the Google Cloud Language API', async () => {
    const result = await strategy.evaluateScores(company, items, scoreThreshold);

    expect(result).toHaveLength(items.length);

    expect(LanguageServiceClient).toHaveBeenCalledTimes(1);
    expect(LanguageServiceClient).toHaveBeenCalledWith();

    result.forEach(({ score, category }) => {
      expect(score).toBeTypeOf('number');
      expect(Object.values(SENTIMENTS)).toContain(category);
    });
  });

  it('should handle undefined scores and return a category of undefined', async () => {
    const expectedResults = [
      { category: 'undefined' },
      { category: 'undefined' },
      { category: 'undefined' },
    ];

    (LanguageServiceClient as unknown as Mock).mockImplementationOnce(() => ({
      analyzeSentiment: vitest.fn().mockResolvedValue([
        {
          documentSentiment: {},
        },
      ]),
    }));

    const result = await strategy.evaluateScores(company, items, scoreThreshold);

    expect(result).toHaveLength(items.length);
    expect(LanguageServiceClient).toHaveBeenCalledTimes(1);
    expect(LanguageServiceClient).toHaveBeenCalledWith();
    expect(result).toEqual(expectedResults);
  });
});
