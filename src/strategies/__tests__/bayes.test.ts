import { expect, describe, it, vitest, afterAll, afterEach } from 'vitest';
import { evaluateScores } from '../bayes';
import { SENTIMENTS } from '../types';

afterAll(() => {
  vitest.resetAllMocks();
});

describe('Naive Bayes evaluateScores', () => {
  afterEach(() => {
    vitest.clearAllMocks();
  });

  const threshold = 1;

  it('should return an array of probability objects', async () => {
    const items = ['This is a positive sentence', 'This is a negative sentence'];
    const result = await evaluateScores(items, threshold);

    expect(result).toHaveLength(items.length);
    result.forEach(({ score, category, probability }) => {
      expect(score).toBeUndefined();
      expect(probability).toBeTypeOf('number');
      expect(Object.values(SENTIMENTS)).toContain(category);
    });
  });

  it('should return an undefined category if an item with empty strings is passed', async () => {
    const items = [''];
    const result = await evaluateScores(items, threshold);

    expect(result).toHaveLength(items.length);
    expect(result).toHaveLength(1);

    const { category } = result[0];
    expect(category).toBe('undefined');
  });

  it('should return an empty array when items array is empty', async () => {
    const items: string[] = [];
    const result = await evaluateScores(items, threshold);

    expect(result).toEqual([]);
  });

  it('should throw an error when items array contains non-string elements', async () => {
    const items = ['This is a positive sentence', 123, { object: 'invalid' }, null];
    try {
      // @ts-ignore
      await evaluateScores(items, threshold);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
