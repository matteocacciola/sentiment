import { Score, ScoresEvaluatorOptions, SentimentValues, ScoresEvaluator } from '../types';
import { strategyProvider } from '../provider';
import { StatsResults } from '../../types';

export const getAnalysisStats = async (
  items: string[],
  scoresEvaluator: ScoresEvaluator,
  threshold: number,
  scoresEvaluatorOptions?: ScoresEvaluatorOptions,
): Promise<StatsResults | null> => {
  if (!items || !items.length) {
    return null;
  }

  const sentimentStats: SentimentValues = { positive: 0, negative: 0, neutral: 0, undefined: 0 };
  const scoresEvaluations = await strategyProvider(scoresEvaluator)(items, threshold, scoresEvaluatorOptions);

  const scores: Score[] = items.map((item: string, index: number): Score => {
    const { score, category } = scoresEvaluations[index];
    sentimentStats[category]++;
    return { text: item, score, category };
  });

  return { sentimentStats, scores };
};
