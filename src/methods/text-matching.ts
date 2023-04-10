import { DescriptiveSource } from '../types';
import { ScoresEvaluatorResult, ScoresEvaluator } from '../strategies/types';
import { strategyProvider } from '../strategies/provider';

type TextMatchingConfig = {
  scoresEvaluator: ScoresEvaluator;
  scoreThreshold: number;
}

type TextMatchingResult = {
  overallMatch: number;
  positiveMatch: number;
  negativeMatch: number;
};

type TokenMatchesCount = {
  overall: number;
  positive: number;
  negative: number;
};

const getTokenMatchesCount = (
  token: string,
  sourcesTokensLength: number,
  sources: DescriptiveSource[],
  scoresEvaluations: ScoresEvaluatorResult[],
): TokenMatchesCount => {
  let overall = 0;
  let positive = 0;
  let negative = 0;

  sources.forEach(({ text: sourceText, rating }, index) => {
    const { score, probability } = scoresEvaluations[index];

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
  options?: TextMatchingConfig,
): Promise<TextMatchingResult> => {
  const scoresEvaluator = options?.scoresEvaluator ?? 'afinn';
  const scoreThreshold = options?.scoreThreshold ?? 0.3;

  const tokens = text.toLowerCase().split(' ');
  const scoresEvaluations = await strategyProvider(scoresEvaluator)(sources.map(source => source.text), scoreThreshold);

  const sourcesTokens = sources.flatMap(({ text: sourceText }) => sourceText.toLowerCase().split(' '));
  const sourcesTokensLength = sourcesTokens.length;

  let overallMatch = 0;
  let positiveMatch = 0;
  let negativeMatch = 0;
  tokens.forEach((token) => {
    const { overall, positive, negative } = getTokenMatchesCount(
      token,
      sourcesTokensLength,
      sources,
      scoresEvaluations,
    );

    overallMatch += overall;
    positiveMatch += positive;
    negativeMatch += negative;
  });

  return { overallMatch, positiveMatch, negativeMatch };
};
