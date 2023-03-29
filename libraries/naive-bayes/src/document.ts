import { getWords } from './helpers';
import { CallbackFunctionType } from './types';

export const eachWord = (content: any, callback: CallbackFunctionType) => {
  return getWords(content).map((word: string) => callback(word));
};
