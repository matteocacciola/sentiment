import { DescriptiveSource, MatchedAttributes } from '../types';
import { ScoreStrategyType, StrategyType } from '../strategies/types';
import { strategyProvider } from '../strategies/provider';

type MatchingConfig = {
  strategy: StrategyType;
  scoreThreshold: number;
}

const getTokenMatchesCount = (
  token: string,
  sourcesTokensLength: number,
  sources: DescriptiveSource[],
  sentiments: ScoreStrategyType[],
) => {
  let overall = 0;
  let positive = 0;
  let negative = 0;

  sources.map(({ text: sourceText, rating }, index) => {
    const { score, probability } = sentiments[index];

    const isTokenIncluded = sourceText.toLowerCase().includes(token);
    const hasPositiveSentiment = (score !== undefined && score > 0) ||
      (probability !== undefined && probability > 0.5);
    const hasNegativeSentiment = (score !== undefined && score < 0) ||
      (probability !== undefined && probability < 0.5);
    const factor = (1 + sourcesTokensLength * (rating - 3) / 10);

    overall += Number(isTokenIncluded) * factor;
    positive += Number(hasPositiveSentiment && isTokenIncluded) * factor;
    negative += Number(hasNegativeSentiment && isTokenIncluded) * factor;
  });

  return { overall, positive, negative };
};

export const textMatching = async (
  text: string,
  sources: DescriptiveSource[],
  options?: MatchingConfig,
): Promise<MatchedAttributes> => {
  const strategy = options?.strategy ?? 'afinn';
  const scoreThreshold = options?.scoreThreshold ?? 0.3;

  const provider = strategyProvider(strategy);
  const tokens = text.toLowerCase().split(' ');
  const sentiments = await provider.evaluateScores(sources.map(source => source.text), scoreThreshold);

  const sourcesTokens = sources.flatMap(({ text: sourceText }) => sourceText.toLowerCase().split(' '));
  const sourcesTokensLength = sourcesTokens.length;

  let overallMatch = 0;
  let positiveMatch = 0;
  let negativeMatch = 0;
  tokens.map((token) => {
    const { overall, positive, negative } = getTokenMatchesCount(token, sourcesTokensLength, sources, sentiments);

    overallMatch += overall;
    positiveMatch += positive;
    negativeMatch += negative;
  });

  return { overallMatch, positiveMatch, negativeMatch };
};
