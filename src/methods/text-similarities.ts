import { getSimilarities } from '../helpers/getSimilarities';

export const textSimilarities = async (text: string, similarityThreshold?: number): Promise<string[][]> => {
  const sentences = text.replace(/([.?!])\s*(?=[A-Z])/g, '$1|')
    .split('|')
    .map(sentence => sentence.trim());
  return getSimilarities(sentences, similarityThreshold ?? 0.5);
};
