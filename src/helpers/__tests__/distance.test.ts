import { describe, expect, it } from 'vitest';
import { distance, dot } from '../distance';

describe('dot', () => {
  it('get the dot product', () => {
    const a = [1, 2, 3, 4];
    const b = [5, 6, 7, 8];

    expect(dot(a, b)).toBe(70);
  });
});
describe('similarity', () => {
  it('get the similarity', () => {
    const a = [1, 2, 3, 4];
    const b = [5, 6, 7, 8];

    expect(distance(a, b)).toBeGreaterThan(0);
  });

  it('get the 0 similarity', () => {
    const a = [0, 0, 0, 0];
    const b = [5, 6, 7, 8];

    expect(distance(a, b)).toBe(0);
  });
});
