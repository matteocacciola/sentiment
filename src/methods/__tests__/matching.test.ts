import { expect, describe, it } from 'vitest';
import { matching } from '../matching';
import { DescriptiveSource } from '../../types';

describe('calculateMatchingAttributes', () => {
  const reviews: DescriptiveSource[] = [
    {
      text: 'The steak was delicious.',
      rating: 5,
    },
    {
      text: 'The chicken was terrible, but the pasta was excellent.',
      rating: 2,
    },
    {
      text: 'The seafood was fresh and amazing!',
      rating: 4,
    },
  ];

  it('should return a positive overall match', async () => {
    const textToMatch = 'I want to eat steak and pasta.';
    const attributes = await matching(textToMatch, reviews);
    expect(attributes.overallMatch).toBeGreaterThan(0);
  });

  it('should return a positive match', async () => {
    const textToMatch = 'I want to eat delicious steak and excellent pasta.';
    const attributes = await matching(textToMatch, reviews);
    expect(attributes.positiveMatch).toBeGreaterThan(0);
  });

  it('should return a negative match', async () => {
    const textToMatch = 'I don\'t want to eat terrible chicken.';
    const attributes = await matching(textToMatch, reviews);
    expect(attributes.negativeMatch).toEqual(0);
  });
});
