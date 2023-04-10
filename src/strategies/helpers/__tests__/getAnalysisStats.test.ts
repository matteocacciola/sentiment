import { expect, describe, it, vitest, SpyInstance, afterEach } from 'vitest';
import * as strategyProvider from '../../provider';
import { ScoresEvaluatorStrategy } from '../../types';
import { getAnalysisStats } from '../getAnalysisStats';

const items: string[] = ['item 1', 'item 2', 'item 3'];
const strategyType: ScoresEvaluatorStrategy = 'afinn';
const threshold: number = 0;

const evaluateScoresMock = vitest.fn().mockResolvedValue([
  { score: 0.5, category: 'positive' },
  { score: -0.5, category: 'negative' },
  { score: 0, category: 'neutral' },
]);
const mockedStrategyProvider: SpyInstance = vitest.spyOn(strategyProvider, 'strategyProvider')
  .mockReturnValue(evaluateScoresMock);

describe('getAnalysisStats', () => {
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
    const result = await getAnalysisStats(items, strategyType, threshold);
    expect(result).toEqual(expectedResult);
  });

  it('should call strategyProvider with the correct strategy type', async () => {
    await getAnalysisStats(items, strategyType, threshold);
    expect(mockedStrategyProvider).toHaveBeenCalledWith(strategyType);
  });

  it('should call evaluateScores with the correct parameters', async () => {
    await getAnalysisStats(items, strategyType, threshold);
    expect(evaluateScoresMock).toHaveBeenCalledWith(items, threshold, undefined);
  });

  it.each([undefined, []])('should return null if items argument is missing or empty', async (item) => {
    expect(await getAnalysisStats(item as unknown as string[], strategyType, threshold))
      .toBeNull();
  });
});
