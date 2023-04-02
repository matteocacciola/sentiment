import { ScoreStrategyOptions, ScoreStrategyType } from './types';

export interface Strategy {
  evaluateScores(
    items: string[],
    scoreThreshold?: number,
    strategyOptions?: ScoreStrategyOptions,
  ): Promise<ScoreStrategyType[]>;
}
