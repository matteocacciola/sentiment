import { cond, constant, stubTrue } from 'lodash';
import { ScoresEvaluatorFunction, ScoresEvaluator, ScoresEvaluatorStrategy } from './types';
import { evaluateScores as googleStrategy } from './google';
import { evaluateScores as afinnStrategy } from './afinn';
import { evaluateScores as vaderStrategy } from './vader';
import { evaluateScores as bayesStrategy } from './bayes';

const isGoogle = (strategy: ScoresEvaluatorStrategy): boolean => strategy === 'google';
const isAfinn = (strategy: ScoresEvaluatorStrategy): boolean => strategy === 'afinn';
const isVader = (strategy: ScoresEvaluatorStrategy): boolean => strategy === 'vader';
const isBayes = (strategy: ScoresEvaluatorStrategy): boolean => strategy === 'bayes';

export const strategyProvider = (strategy: ScoresEvaluator): ScoresEvaluatorFunction => {
  if (typeof strategy !== 'string') {
    return strategy as ScoresEvaluatorFunction;
  }

  const provider = cond<ScoresEvaluatorStrategy, ScoresEvaluatorFunction>([
    [isGoogle, constant<ScoresEvaluatorFunction>(googleStrategy)],
    [isAfinn, constant<ScoresEvaluatorFunction>(afinnStrategy)],
    [isVader, constant<ScoresEvaluatorFunction>(vaderStrategy)],
    [isBayes, constant<ScoresEvaluatorFunction>(bayesStrategy)],
    [stubTrue, constant<ScoresEvaluatorFunction>(afinnStrategy)],
  ]);

  return provider(strategy as ScoresEvaluatorStrategy);
};
