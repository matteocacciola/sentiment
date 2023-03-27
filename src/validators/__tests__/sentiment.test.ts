import { expect, describe, it } from 'vitest';
import { MEDIA } from '../../types';
import { validator } from '../sentiment';

describe('sentiment validator', () => {
  it('should throw an error if no media is provided', () => {
    expect(() => validator()).toThrow('At least a media for sentiment evaluation should be provided');
  });

  it('should return an array of media types if valid media is provided', () => {
    const media = [MEDIA.facebook, MEDIA.twitter];
    expect(validator(media)).toEqual(['facebook', 'twitter']);
  });

  it('should throw an error if invalid media is provided', () => {
    const media = ['invalid_media', MEDIA.youtube];
    expect(() => validator(media)).toThrow('Invalid media provided. Please, check your configuration');
  });
});
