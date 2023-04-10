import moment from 'moment';
import { DateRange } from '../types';

export const getTimerange = (period: number): DateRange => {
  const until = moment();
  const since = until.clone().subtract(period, 'days');

  return {
    since: since.toISOString(),
    until: until.toISOString(),
  };
};
