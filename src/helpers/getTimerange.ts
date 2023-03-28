import moment from 'moment';
import { DateRange } from '../types';

export const getTimerange = (period: number): DateRange => {
  const since = moment();
  const until = since.subtract(period, 'days');

  return {
    since: since.toISOString(),
    until: until.toISOString(),
  };
};
