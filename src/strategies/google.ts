import { Strategy } from './interfaces';
import { ScoreStrategyType, SENTIMENTS, SentimentsType } from './types';
import { LanguageServiceClient } from '@google-cloud/language';
import { google } from '@google-cloud/language/build/protos/protos';
import { getSentimentType } from './helpers/getSentimentType';

const strategy: Strategy = {
  async evaluateScores (
    company: string,
    items: string[],
    scoreThreshold: number,
  ): Promise<ScoreStrategyType[]> {
    const client = new LanguageServiceClient();

    return Promise.all(items.map(async (item) => {
      const document = { content: item, type: google.cloud.language.v1.Document.Type.PLAIN_TEXT };
      const [result] = await client.analyzeSentiment({ document });

      const sentiment = result.documentSentiment;
      if (!sentiment?.score) {
        return { category: SENTIMENTS.undefined as unknown as SentimentsType };
      }

      return { score: sentiment.score, category: getSentimentType(sentiment.score, scoreThreshold) };
    }));
  },
};

export default strategy;
