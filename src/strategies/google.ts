import { LanguageServiceClient } from '@google-cloud/language';
import { google } from '@google-cloud/language/build/protos/protos';
import {
  ScoresEvaluatorFunction,
  ScoresEvaluatorOptions,
  ScoresEvaluatorResult,
  SENTIMENTS,
  SentimentType,
} from './types';
import { getSentimentType } from './helpers/getSentimentType';

export const evaluateScores: ScoresEvaluatorFunction = async (
  items: string[],
  threshold: number,
  options?: ScoresEvaluatorOptions,
): Promise<ScoresEvaluatorResult[]> => {
  const client = new LanguageServiceClient(options);

  return Promise.all(items.map(async (item) => {
    const document = { content: item, type: google.cloud.language.v1.Document.Type.PLAIN_TEXT };
    const [{ documentSentiment: sentiment }] = await client.analyzeSentiment({ document });

    if (!sentiment?.score) {
      return { category: SENTIMENTS.undefined as unknown as SentimentType };
    }

    // sentiment.score is already within [-1, 1]
    return { score: sentiment.score, category: getSentimentType(sentiment.score, threshold) };
  }));
};
