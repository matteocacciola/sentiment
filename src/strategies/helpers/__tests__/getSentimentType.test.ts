import { expect, describe, it } from 'vitest';
import { getSentimentType } from '../getSentimentType';

describe('getSentimentType', () => {
  it('should return "negative" when score is less than negative threshold', () => {
    expect(getSentimentType(-0.6, 0.5)).toEqual('negative');
  });

  it('should return "positive" when score is greater than positive threshold', () => {
    expect(getSentimentType(0.6, 0.5)).toEqual('positive');
  });

  it('should return "neutral" when score is between negative and positive threshold', () => {
    expect(getSentimentType(0.2, 0.5)).toEqual('neutral');
  });

  it('should return "negative" when score is equal to negative threshold', () => {
    expect(getSentimentType(-0.5, 0.5)).toEqual('negative');
  });

  it('should return "positive" when score is equal to positive threshold', () => {
    expect(getSentimentType(0.5, 0.5)).toEqual('positive');
  });

  it('should return "neutral" when score is equal to zero', () => {
    expect(getSentimentType(0, 0.5)).toEqual('neutral');
  });
});
