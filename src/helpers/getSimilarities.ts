require('@tensorflow/tfjs-node');

import { distance } from './distance';
import { UniversalSentenceEncoder } from '@tensorflow-models/universal-sentence-encoder';

type KeysInGroup = { [x: number]: number; };

const cosineSimilarityMatrix = (matrix: number[][]): number[][] => {
  const similarityMatrix: number[][] = [];
  for (let i: number = 0; i < matrix.length; i++) {
    const row: number[] = [];
    for (let j: number = 0; j < matrix.length; j++ ) {
      row.push(j < i ? similarityMatrix[j][i] : (j === i ? 1 : distance(matrix[i], matrix[j])));
    }
    similarityMatrix.push(row);
  }
  return similarityMatrix;
};

const formGroups = (sentences: string[], similarityMatrix: number[][], threshold: number): string[][] => {
  let keysInGroup: KeysInGroup = {};
  const groups: Set<number>[] = [];
  similarityMatrix.forEach((row, i) => {
    row.forEach((item, j) => {
      if (i !== j && item > threshold) {
        let groupNum: number = keysInGroup[i];
        if (!(i in keysInGroup)) {
          groupNum = groups.length;
          keysInGroup[i] = groupNum;
        }
        if (!(j in keysInGroup)) {
          keysInGroup[j] = groupNum;
        }

        if (groups.length <= groupNum) {
          groups.push(new Set());
        }
        groups[groupNum].add(i);
        groups[groupNum].add(j);
      }
    });
  });

  return groups
    .map(set => Array.from(set))
    .map(group => group.map((item) => sentences[item]))
    .concat(
      sentences
        .filter((sentence, key) => Object.keys(keysInGroup).indexOf(`${key}`) === -1)
        .map(sentence => [sentence]),
    );
};

export const getSimilarities = async (sentences: string[], threshold: number): Promise<string[][]> => {
  const model = new UniversalSentenceEncoder();
  await model.load();
  const embeddings = await model.embed(sentences);
  const matrix = cosineSimilarityMatrix(embeddings.arraySync());

  return formGroups(sentences, matrix, threshold);
};
