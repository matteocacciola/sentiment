import { expect, describe, it, afterAll, vitest } from 'vitest';
import { evaluateScores } from '../afinn/evaluateScores';
import { SENTIMENTS } from '../../types';

afterAll(() => {
  vitest.resetAllMocks();
});

describe('AFINN evaluateScores', () => {
  it('should return an array of score objects', async () => {
    const company = 'Test Company';
    const items = ['This is a positive sentence', 'This is a negative sentence'];
    const scoreThreshold = 1;
    const result = await evaluateScores(company, items, scoreThreshold);

    expect(result).toHaveLength(items.length);
    result.forEach(({ score, category }) => {
      expect(score).toBeTypeOf('number');
      expect(Object.values(SENTIMENTS)).toContain(category);
    });
  });

  it('should return an undefined category if an item with empty strings is passed', async () => {
    const company = 'Test Company';
    const items = [''];
    const scoreThreshold = 1;
    const result = await evaluateScores(company, items, scoreThreshold);

    expect(result).toHaveLength(items.length);
    expect(result).toHaveLength(1);

    const { category } = result[0];
    expect(category).toBe('undefined');
  });

  it('should return an empty array when items array is empty', async () => {
    const company = 'Test Company';
    const items: string[] = [];
    const scoreThreshold = 1;
    const result = await evaluateScores(company, items, scoreThreshold);

    expect(result).toEqual([]);
  });

  it('should throw an error when items array contains non-string elements', async () => {
    const company = 'Test Company';
    const items = ['This is a positive sentence', 123, { object: 'invalid' }, null];
    const scoreThreshold = 1;
    try {
      // @ts-ignore
      await evaluateScores(company, items, scoreThreshold);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
