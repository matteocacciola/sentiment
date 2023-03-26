import { StrategyType } from '../types';
import { cond, constant, stubTrue } from 'lodash';
import { Strategy } from './interfaces';
import googleStrategy from './google';
import afinnStrategy from './afinn';
import vaderStrategy from './vader';

const isGoogle = (strategy: StrategyType): boolean => strategy === 'google';
const isAfinn = (strategy: StrategyType): boolean => strategy === 'afinn';
const isVader = (strategy: StrategyType): boolean => strategy === 'vader';

export const strategyProvider = (strategy: StrategyType): Strategy => {
  const provider = cond<StrategyType, Strategy>([
    [isGoogle, constant<Strategy>(googleStrategy)],
    [isAfinn, constant<Strategy>(afinnStrategy)],
    [isVader, constant<Strategy>(vaderStrategy)],
    [stubTrue, constant<Strategy>(afinnStrategy)],
  ]);

  return provider(strategy);
};
