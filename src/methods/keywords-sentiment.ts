import { SentimentAnalyzer, TfIdf, PorterStemmer } from 'natural';
import { getSentimentType } from '../strategies/helpers/getSentimentType';
import { SentimentAnalysisResult } from '../types';
import { getSimilarities } from '../helpers/getSimilarities';

type SentimentResult = Omit<SentimentAnalysisResult, 'timeRange' | 'summary'>;
type SentimentConfig = {
  scoreThreshold?: number;
  similarityThreshold?: number;
}

const getAveragedScore = async (
  analyzer: SentimentAnalyzer,
  tfidf: TfIdf,
  sentences: string[],
  similarityThreshold: number,
): Promise<number | undefined> => {
  const similarities = await getSimilarities(sentences, similarityThreshold);

  let num = 0, den = 0;
  similarities.forEach((group, i) => {
    const document = group.join(' ');
    tfidf.addDocument(document);

    const keywords = tfidf.listTerms(i)
      .sort((a, b) => b.tfidf - a.tfidf)
      .map(list => list.term);

    if (keywords) {
      den += keywords.length;
      num += keywords.length * analyzer.getSentiment(keywords);
    }
  });

  return num ? num / den : undefined;
};

export const keywordsSentiment = async (items: string[], options?: SentimentConfig): Promise<SentimentResult> => {
  const similarityThreshold: number = options?.similarityThreshold ?? 0.5;
  const scoreThreshold: number = Math.min(Math.abs( options?.scoreThreshold ?? 0.3), 1);

  const tfidf = new TfIdf();
  const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
  const result: SentimentResult = {
    positive: 0,
    negative: 0,
    neutral: 0,
    analyzedElements: [],
    sentimentScore: 0,
    analyzedAt: new Date().toISOString(),
  };

  await Promise.all(items.map(async (item) => {
    const sentences = item.replace(/([.?!])\s*(?=[A-Z])/g, '$1|')
      .split('|')
      .map(sentence => sentence.trim());
    const score = await getAveragedScore(analyzer, tfidf, sentences, similarityThreshold);

    if (score) {
      const category = getSentimentType(score, scoreThreshold);
      // @ts-ignore
      result[category]++;

      result.analyzedElements.push({ text: item, score, category });
    }
  }));

  result.sentimentScore = (result.positive - result.negative) / result.analyzedElements.length;

  return result;
};
