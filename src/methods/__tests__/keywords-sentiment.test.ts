import { expect, describe, it } from 'vitest';
import { keywordsSentiment } from '../keywords-sentiment';

describe.skip('keywordsSentiment', () => {
  const inputs= [
    'I love my new car! It\'s fast, comfortable and stylish. ' +
      'I really enjoyed the movie. The acting was great and the plot kept me engaged. ' +
      'Unfortunately, the dinner was awful: dishes were cold, saltless and bland.',
    'Will it snow tomorrow? ' +
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
      'The mouse ate the cat.',
  ];

  it('success', async () => {
    const results = await keywordsSentiment(inputs);
    expect(results.positive).toEqual(1);
    expect(results.negative).toEqual(0);
    expect(results.neutral).toEqual(1);
    expect(results.sentimentScore).toEqual(0.5);
  }, 20000);
});
