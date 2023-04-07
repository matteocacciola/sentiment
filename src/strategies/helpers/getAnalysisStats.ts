import { Score, ScoreStrategyOptions, SentimentValues, StrategyType } from '../types';
import { strategyProvider } from '../provider';
import { StatsResultType } from '../../types';

export const getAnalysisStats = async (
  items: string[],
  strategyType: StrategyType,
  scoreThreshold: number,
  strategyOptions?: ScoreStrategyOptions,
): Promise<StatsResultType> => {
  if (!items || !items.length) {
    return null;
  }

  const sentimentStats: SentimentValues = { positive: 0, negative: 0, neutral: 0, undefined: 0 };
  const scoreEvaluator = strategyProvider(strategyType);

  const scoreEvaluations = await scoreEvaluator.evaluateScores(items, scoreThreshold, strategyOptions);

  const scores: Score[] = items.map((item: string, index: number): Score => {
    const { score, category } = scoreEvaluations[index];
    sentimentStats[category]++;
    return { text: item, score, category };
  });

  return { sentimentStats, scores };
};
