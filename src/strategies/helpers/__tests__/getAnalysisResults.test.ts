import { expect, describe, it, vitest, SpyInstance, afterEach } from 'vitest';
import * as strategyProvider from '../../provider';
import { getAnalysisResults } from '../getAnalysisResults';
import { ScoresEvaluatorStrategy } from '../../types';

const company = 'Test Company';
const items = ['item 1', 'item 2', 'item 3'];
const strategyType: ScoresEvaluatorStrategy = 'afinn';
const threshold = 0;

const evaluateScoresMock = vitest.fn().mockResolvedValue([
  { score: 0.5, category: 'positive' },
  { score: -0.5, category: 'negative' },
  { score: 0, category: 'neutral' },
]);

const mockedStrategyProvider: SpyInstance = vitest.spyOn(strategyProvider, 'strategyProvider')
  .mockReturnValue(evaluateScoresMock);

describe('getAnalysisResults', () => {
  afterEach(() => {
    vitest.clearAllMocks();
  });

  it('should return the expected sentiment stats and scores', async () => {
    const expectedResult = {
      sentimentStats: { positive: 1, negative: 1, neutral: 1, undefined: 0 },
      scores: [
        { text: 'item 1', score: 0.5, category: 'positive' },
        { text: 'item 2', score: -0.5, category: 'negative' },
        { text: 'item 3', score: 0, category: 'neutral' },
      ],
    };
    const result = await getAnalysisResults(company, items, strategyType, threshold);
    expect(result).toEqual(expectedResult);
  });

  it('should call strategyProvider with the correct strategy type', async () => {
    await getAnalysisResults(company, items, strategyType, threshold);
    expect(mockedStrategyProvider).toHaveBeenCalledWith(strategyType);
  });

  it('should call evaluateScores with the correct parameters', async () => {
    await getAnalysisResults(company, items, strategyType, threshold);
    expect(evaluateScoresMock).toHaveBeenCalledWith(items, threshold, undefined);
  });

  it('should throw an error if company argument is missing', async () => {
    await expect(getAnalysisResults(undefined as unknown as string, items, strategyType, threshold))
      .rejects.toThrowError('Missing argument: company');
  });

  it.each([undefined, []])('should return null if items argument is missing or empty', async (item) => {
    expect(await getAnalysisResults(company, item as unknown as string[], strategyType, threshold))
      .toBeNull();
  });
});
