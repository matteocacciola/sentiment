import { AnalysisResultType, MediaType } from '../../types';
import { strategyProvider } from '../provider';
import { SentimentValues, StrategyType, Score, ScoreStrategyOptions } from '../types';

export const getAnalysisResults = async (
  company: string,
  media: MediaType,
  items: string[],
  strategyType: StrategyType,
  scoreThreshold: number,
  strategyOptions?: ScoreStrategyOptions,
): Promise<AnalysisResultType> => {
  if (!company) {
    throw new Error('Missing argument: company');
  }

  if (!items || !items.length) {
    return null;
  }

  const sentimentStats: SentimentValues = { positive: 0, negative: 0, neutral: 0, undefined: 0 };
  const strategy = strategyProvider(strategyType);

  const scoreEvaluations = await strategy.evaluateScores(items, scoreThreshold, strategyOptions);

  const scores: Score[] = items.map((item: string, index: number): Score => {
    const { score, category } = scoreEvaluations[index];
    sentimentStats[category]++;
    return { text: item, score, category };
  });

  return { sentimentStats, scores };
};
