import { AnalysisResultType, MediaType } from '../../types';
import { strategyProvider } from '../provider';
import { SentimentValues, StrategyType, Score } from '../types';

export const getAnalysisResults = async (
  company: string,
  media: MediaType,
  items: string[],
  strategyType: StrategyType,
  scoreThreshold: number,
): Promise<AnalysisResultType> => {
  if (!company) {
    throw new Error('Missing argument: company');
  }

  if (!items || !items.length) {
    return null;
  }

  const sentimentStats: SentimentValues = { positive: 0, negative: 0, neutral: 0, undefined: 0 };
  const strategy = strategyProvider(strategyType);

  const scoreEvaluation = await strategy.evaluateScores(company, items, scoreThreshold);

  const scores: Score[] = items.map((item: string, index: number): Score => {
    const { score, category } = scoreEvaluation[index];
    sentimentStats[category]++;
    return { text: item, score, category };
  });

  return { sentimentStats, scores };
};
