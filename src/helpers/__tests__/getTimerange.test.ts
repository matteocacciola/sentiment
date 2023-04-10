import { expect, describe, it } from 'vitest';
import { getTimerange } from '../getTimerange';

describe('getTimerange', () => {
  it('should return a date range object with since and until properties', () => {
    const dateRange = getTimerange(7);
    expect(dateRange).toHaveProperty('since');
    expect(dateRange).toHaveProperty('until');
  });

  it('should return a date range object where since is a valid ISO string', () => {
    const dateRange = getTimerange(7);
    expect(() => new Date(dateRange.since)).not.toThrow();
  });

  it('should return a date range object where until is a valid ISO string', () => {
    const dateRange = getTimerange(7);
    expect(() => new Date(dateRange.until)).not.toThrow();
  });

  it('should return a date range object where until is the current date and period is zero', () => {
    const dateRange = getTimerange(0);
    const now = new Date();
    const since = new Date(dateRange.since);
    expect(since.getUTCFullYear()).toEqual(now.getUTCFullYear());
    expect(since.getUTCMonth()).toEqual(now.getUTCMonth());
    expect(since.getUTCDate()).toEqual(now.getUTCDate());
  });

  it('should return a date range object where since is the current date minus the specified number of days', () => {
    const period = 7;
    const dateRange = getTimerange(period);
    const now = new Date();
    const since = new Date(dateRange.since);
    const expectedSince = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - period),
    );
    expect(since.getUTCFullYear()).toEqual(expectedSince.getUTCFullYear());
    expect(since.getUTCMonth()).toEqual(expectedSince.getUTCMonth());
    expect(since.getUTCDate()).toEqual(expectedSince.getUTCDate());
  });
});
