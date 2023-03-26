import { AnalysisResultType, MediaType, Score, SentimentValues, StrategyType } from '../types';
import { strategyProvider } from '../strategies/provider';
import { CONFIG } from '../constants';

export const getAnalysisResults = async (
  company: string,
  media: MediaType,
  items: string[],
): Promise<AnalysisResultType> => {
  const sentimentStats: SentimentValues = { positive: 0, negative: 0, neutral: 0, undefined: 0 };
  const strategy = strategyProvider(CONFIG.STRATEGY_PROVIDER as StrategyType);

  const scoreEvaluation = await strategy.evaluateScores(company, items);

  const scores: Score[] = items.map((item: string, index: number): Score => {
    const { score, category } = scoreEvaluation[index];
    sentimentStats[category]++;
    return { text: item, score, category };
  });

  return { sentimentStats, scores };
};
