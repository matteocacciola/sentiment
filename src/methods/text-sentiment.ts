import { SentimentAnalysisResult } from '../types';
import { ScoreStrategyOptions, StrategyType } from '../strategies/types';
import { getAnalysisStats } from '../strategies/helpers/getAnalysisStats';

type SentimentResult = Omit<SentimentAnalysisResult, 'timeRange' | 'summary'> | null;

type SentimentConfig = {
  strategy?: StrategyType;
  scoreThreshold?: number;
  strategyOptions?: ScoreStrategyOptions;
}

export const textSentiment = async (items: string[], options?: SentimentConfig): Promise<SentimentResult> => {
  const { strategy, scoreThreshold, strategyOptions } = options ?? {};
  const scaledScoreThreshold = Math.min(Math.abs(scoreThreshold ?? 0.3), 1);

  const result = await getAnalysisStats(
    items,
    strategy ?? 'afinn',
    scaledScoreThreshold,
    strategyOptions,
  );

  if (!result) {
    return result;
  }

  const { sentimentStats, scores: analyzedElements } = result;
  return {
    sentimentStats,
    analyzedElements,
    sentimentScore: (sentimentStats.positive - sentimentStats.negative) / analyzedElements.length,
    analyzedAt: new Date().toISOString(),
  };
};
