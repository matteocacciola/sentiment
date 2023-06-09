import { expect, describe, it, vitest, afterEach, afterAll } from 'vitest';
import { evaluateScores } from '../vader';

const vader = require('vader-sentiment');

afterAll(() => {
  vitest.resetAllMocks();
});

vitest.spyOn(vader.SentimentIntensityAnalyzer, 'polarity_scores').mockImplementation((text) => {
  if (text === 'I love this product') {
    return { compound: 0.9 };
  }
  if (text === 'This product is terrible') {
    return { compound: -0.9 };
  }
  if (text === 'This product is okay') {
    return { compound: 0 };
  }
  return { compound: NaN };
});

describe('VADER evaluateScores', () => {
  afterEach(() => {
    vitest.clearAllMocks();
  });

  const threshold = 0.5;
  const items = ['I love this product', 'This product is terrible'];

  it('should return an array of scores for each item in the array', async () => {
    const results = await evaluateScores(items, threshold);
    expect(results).toHaveLength(items.length);
  });

  it('should return a score for each item in the array', async () => {
    const results = await evaluateScores(items, threshold);
    results.forEach(result => {
      expect(result).toHaveProperty('score');
    });
  });

  it('should return a sentiment category for each item in the array', async () => {
    const results = await evaluateScores(items, threshold);
    results.forEach(result => {
      expect(result).toHaveProperty('category');
    });
  });

  it('should return a sentiment category of "positive" for a positive item', async () => {
    const results = await evaluateScores([items[0]], threshold);
    expect(results[0].category).toEqual('positive');
  });

  it('should return a sentiment category of "negative" for a negative item', async () => {
    const results = await evaluateScores([items[1]], threshold);
    expect(results[0].category).toEqual('negative');
  });

  it('should return a sentiment category of "neutral" for a neutral item', async () => {
    const results = await evaluateScores(['This product is okay'], threshold);
    expect(results[0].category).toEqual('neutral');
  });

  it('should return a sentiment category of "undefined" if the score cannot be calculated', async () => {
    const results = await evaluateScores([''], threshold);
    expect(results[0].category).toEqual('undefined');
  });
});
