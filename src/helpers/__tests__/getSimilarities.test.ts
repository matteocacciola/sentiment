require('@tensorflow/tfjs-node');

import { describe, expect, it } from 'vitest';
import { UniversalSentenceEncoder } from '@tensorflow-models/universal-sentence-encoder';
import { getSimilarities } from '../getSimilarities';

const similarityThreshold = 0.5;
const text = 'Will it snow tomorrow? ' +
  'Recently a lot of hurricanes have hit the US. ' +
  'Global warming is real. ' +
  'An apple a day, keeps the doctors away. ' +
  'Eating strawberries is healthy. ' +
  'What is your age? ' +
  'How old are you? ' +
  'How are you? ' +
  'The dog bit Johnny. ' +
  'Johnny bit the dog. ' +
  'The cat ate the mouse. ' +
  'The mouse ate the cat.';

const sentences = text.replace(/([.?!])\s*(?=[A-Z])/g, '$1|')
  .split('|')
  .map(sentence => sentence.trim());

const model = new UniversalSentenceEncoder();

describe('getSimilarities', () => {
  it('get the similarities', async () => {
    await model.load();
    const similarities = await getSimilarities(model, sentences, similarityThreshold);

    expect(similarities).toStrictEqual([
      [
        'Recently a lot of hurricanes have hit the US.',
        'Global warming is real.',
      ],
      [ 'What is your age?', 'How old are you?' ],
      [ 'The dog bit Johnny.', 'Johnny bit the dog.' ],
      [ 'The cat ate the mouse.', 'The mouse ate the cat.' ],
      [ 'Will it snow tomorrow?' ],
      [ 'An apple a day, keeps the doctors away.' ],
      [ 'Eating strawberries is healthy.' ],
      [ 'How are you?' ],
    ]);
  }, 20000);
});
