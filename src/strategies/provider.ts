import { StrategyType } from '../types';
import { cond, constant, stubTrue } from 'lodash';
import { Strategy } from './interfaces';
import googleStrategy from './google';
import afinnStrategy from './afinn';
import vaderStrategy from './vader';
import bayesStrategy from './bayes';

const isGoogle = (strategy: StrategyType): boolean => strategy === 'google';
const isAfinn = (strategy: StrategyType): boolean => strategy === 'afinn';
const isVader = (strategy: StrategyType): boolean => strategy === 'vader';
const isBayes = (strategy: StrategyType): boolean => strategy === 'bayes';

export const strategyProvider = (strategy: StrategyType): Strategy => {
  const provider = cond<StrategyType, Strategy>([
    [isGoogle, constant<Strategy>(googleStrategy)],
    [isAfinn, constant<Strategy>(afinnStrategy)],
    [isVader, constant<Strategy>(vaderStrategy)],
    [isBayes, constant<Strategy>(bayesStrategy)],
    [stubTrue, constant<Strategy>(afinnStrategy)],
  ]);

  return provider(strategy);
};
