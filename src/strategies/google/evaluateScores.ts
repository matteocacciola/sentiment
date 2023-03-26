import { LanguageServiceClient } from '@google-cloud/language';
import { ScoreStrategyType, SENTIMENTS, SentimentsType } from '../../types';
import { google } from '@google-cloud/language/build/protos/protos';
import { getSentimentType } from '../../helpers/getSentimentType';

export const evaluateScores = async (company: string, items: string[]): Promise<ScoreStrategyType[]> => {
  const client = new LanguageServiceClient();

  return Promise.all(items.map(async (item) => {
    const document = { content: item, type: google.cloud.language.v1.Document.Type.PLAIN_TEXT };
    const [result] = await client.analyzeSentiment({ document });

    const sentiment = result.documentSentiment;
    if (!sentiment?.score) {
      return { category: SENTIMENTS.undefined as unknown as SentimentsType };
    }

    return { score: sentiment.score, category: getSentimentType(sentiment.score) };
  }));
};
