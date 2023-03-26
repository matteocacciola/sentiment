import { ScoreStrategyType } from '../types';

export interface Strategy {
  evaluateScores(company: string, items: string[]): Promise<ScoreStrategyType[]>;
}
