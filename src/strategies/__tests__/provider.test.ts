import { expect, describe, it } from 'vitest';
import { strategyProvider } from '../provider';
import { STRATEGIES, StrategyType } from '../../types';
import afinnStrategy from '../afinn';

describe('strategyProvider', () => {
  it('should return the corresponding strategy for a valid strategy type', () => {
    for (const strategy in STRATEGIES) {
      const provider = strategyProvider(strategy as StrategyType);
      expect(typeof provider).toEqual('object');
      expect(provider).toEqual(expect.objectContaining({
        evaluateScores: expect.any(Function),
      }));
    }
  });

  it('should return the default strategy for an invalid strategy type', () => {
    const invalid = strategyProvider('invalid' as StrategyType);
    expect(invalid).toEqual(afinnStrategy);
  });
});
