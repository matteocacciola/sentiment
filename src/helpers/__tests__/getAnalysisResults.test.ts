import { expect, describe, it, vitest, beforeEach, SpyInstance } from 'vitest';
import { getAnalysisResults } from '../getAnalysisResults';
import { MediaType, StrategyType } from '../../types';
import * as strategyProvider from '../../strategies/provider';

let mockedStrategyProvider: SpyInstance;

const company = 'Test Company';
const media: MediaType = 'twitter';
const items = ['item 1', 'item 2', 'item 3'];
const strategyType: StrategyType = 'afinn';
const scoreThreshold = 0;

const evaluateScoresMock = vitest.fn().mockResolvedValue([
  { score: 0.5, category: 'positive' },
  { score: -0.5, category: 'negative' },
  { score: 0, category: 'neutral' },
]);

beforeEach(() => {
  mockedStrategyProvider = vitest.spyOn(strategyProvider, 'strategyProvider')
    .mockReturnValue({ evaluateScores: evaluateScoresMock });
});

describe('getAnalysisResults', () => {
  it('should return the expected sentiment stats and scores', async () => {
    const expectedResult = {
      sentimentStats: { positive: 1, negative: 1, neutral: 1, undefined: 0 },
      scores: [
        { text: 'item 1', score: 0.5, category: 'positive' },
        { text: 'item 2', score: -0.5, category: 'negative' },
        { text: 'item 3', score: 0, category: 'neutral' },
      ],
    };
    const result = await getAnalysisResults(company, media, items, strategyType, scoreThreshold);
    expect(result).toEqual(expectedResult);
  });

  it('should call strategyProvider with the correct strategy type', async () => {
    await getAnalysisResults(company, media, items, strategyType, scoreThreshold);
    expect(mockedStrategyProvider).toHaveBeenCalledWith(strategyType);
  });

  it('should call evaluateScores with the correct parameters', async () => {
    await getAnalysisResults(company, media, items, strategyType, scoreThreshold);
    expect(evaluateScoresMock).toHaveBeenCalledWith(company, items, scoreThreshold);
  });
});
