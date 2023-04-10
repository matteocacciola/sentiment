import { AnalysisResults } from '../../types';
import { ScoresEvaluatorOptions, ScoresEvaluator } from '../types';
import { getAnalysisStats } from './getAnalysisStats';

export const getAnalysisResults = async (
  company: string,
  items: string[],
  scoresEvaluator: ScoresEvaluator,
  threshold: number,
  scoresEvaluatorOptions?: ScoresEvaluatorOptions,
): Promise<AnalysisResults> => {
  if (!company) {
    throw new Error('Missing argument: company');
  }

  return getAnalysisStats(items, scoresEvaluator, threshold, scoresEvaluatorOptions);
};
