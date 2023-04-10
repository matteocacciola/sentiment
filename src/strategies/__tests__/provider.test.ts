import { expect, describe, it } from 'vitest';
import { strategyProvider } from '../provider';
import { evaluateScores as afinnStrategy } from '../afinn';
import { ScoresEvaluatorResult, SCORES_STRATEGIES, ScoresEvaluatorStrategy } from '../types';

describe('strategyProvider', () => {
  it('should return the corresponding strategy for a valid strategy type', () => {
    for (const strategy in SCORES_STRATEGIES) {
      const provider = strategyProvider(strategy as ScoresEvaluatorStrategy);
      expect(typeof provider).toEqual('function');
    }
  });

  it('should return a callback when it is provided as strategy', () => {
    const expected = (): Promise<ScoresEvaluatorResult[]> => {
      return Promise.resolve([{ score: 0.3, category: 'neutral' }]);
    };
    const provider = strategyProvider(expected);
    expect(provider).toBeTypeOf(typeof expected);
  });

  it('should return the default strategy for an invalid strategy type', () => {
    const invalid = strategyProvider('invalid' as ScoresEvaluatorStrategy);
    expect(invalid).toEqual(afinnStrategy);
  });
});
