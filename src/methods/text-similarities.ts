require('@tensorflow/tfjs-node');

import { getSimilarities } from '../helpers/getSimilarities';
import { UniversalSentenceEncoder } from '@tensorflow-models/universal-sentence-encoder';

export const textSimilarities = async (text: string, similarityThreshold?: number): Promise<string[][]> => {
  const model = new UniversalSentenceEncoder();
  await model.load();

  const sentences = text.replace(/([.?!])\s*(?=[A-Z])/g, '$1|')
    .split('|')
    .map(sentence => sentence.trim());
  return getSimilarities(model, sentences, similarityThreshold ?? 0.5);
};
