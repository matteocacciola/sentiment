import { MEDIA, MediaType } from '../types';

export const validator = (media?: string[]): MediaType[] => {
  if (!media) {
    throw new Error('At least a media for sentiment evaluation should be provided');
  }

  return media.map(medium => {
    // @ts-ignore
    if (!Object.values(MEDIA).includes(medium)) {
      throw new Error('Invalid media provided. Please, check your configuration');
    }
    return medium as MediaType;
  });
};
