import { expect, describe, it } from 'vitest';
import { textSimilarities } from '../text-similarities';

describe('textSimilarities', () => {
  const text= 'Will it snow tomorrow? ' +
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

  it.skip('success', async () => {
    const results = await textSimilarities(text);
    expect(results).toStrictEqual([
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
