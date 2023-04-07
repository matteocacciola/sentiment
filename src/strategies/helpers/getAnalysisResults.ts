import { AnalysisResultType } from '../../types';
import { StrategyType, ScoreStrategyOptions } from '../types';
import { getAnalysisStats } from './getAnalysisStats';

export const getAnalysisResults = async (
  company: string,
  items: string[],
  strategyType: StrategyType,
  scoreThreshold: number,
  strategyOptions?: ScoreStrategyOptions,
): Promise<AnalysisResultType> => {
  if (!company) {
    throw new Error('Missing argument: company');
  }

  return getAnalysisStats(items, strategyType, scoreThreshold, strategyOptions);
};
