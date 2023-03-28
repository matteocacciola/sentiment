import { expect, describe, it, vitest, afterEach, afterAll } from 'vitest';
import { evaluateScores } from '../vader/evaluateScores';

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

  const company = 'Acme';
  const scoreThreshold = 0.5;

  it('should return an array of scores for each item in the array', async () => {
    const items = ['I love this product', 'This product is terrible'];
    const results = await evaluateScores(company, items, scoreThreshold);
    expect(results).toHaveLength(items.length);
  });

  it('should return a score for each item in the array', async () => {
    const items = ['I love this product', 'This product is terrible'];
    const results = await evaluateScores(company, items, scoreThreshold);
    results.forEach(result => {
      expect(result).toHaveProperty('score');
    });
  });

  it('should return a sentiment category for each item in the array', async () => {
    const items = ['I love this product', 'This product is terrible'];
    const results = await evaluateScores(company, items, scoreThreshold);
    results.forEach(result => {
      expect(result).toHaveProperty('category');
    });
  });

  it('should return a sentiment category of "positive" for a positive item', async () => {
    const items = ['I love this product'];
    const results = await evaluateScores(company, items, scoreThreshold);
    expect(results[0].category).toEqual('positive');
  });

  it('should return a sentiment category of "negative" for a negative item', async () => {
    const items = ['This product is terrible'];
    const results = await evaluateScores(company, items, scoreThreshold);
    expect(results[0].category).toEqual('negative');
  });

  it('should return a sentiment category of "neutral" for a neutral item', async () => {
    const items = ['This product is okay'];
    const results = await evaluateScores(company, items, scoreThreshold);
    expect(results[0].category).toEqual('neutral');
  });

  it('should return a sentiment category of "undefined" if the score cannot be calculated', async () => {
    const items = [''];
    const results = await evaluateScores(company, items, scoreThreshold);
    expect(results[0].category).toEqual('undefined');
  });
});
