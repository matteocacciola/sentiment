import { expect, describe, it } from 'vitest';
import { sentimentMediaFactory } from '../factory';
import { MEDIA, MediaType } from '../../types';

describe('sentimentMediaFactory', () => {
  it('should return a function for valid media types', () => {
    for (const media in MEDIA) {
      const provider = sentimentMediaFactory(media as MediaType);
      expect(typeof provider).toEqual('function');
    }
  });

  it('should throw an error for an invalid media type', () => {
    // @ts-ignore
    expect(() => sentimentMediaFactory('invalid')).toThrowError('Invalid media provider');
  });
});
