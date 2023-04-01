import { ScoreStrategyType } from './types';

export interface Strategy {
  evaluateScores(items: string[], scoreThreshold?: number): Promise<ScoreStrategyType[]>;
}
