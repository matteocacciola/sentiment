import * as moment from 'moment';
import { CONFIG } from '../constants';
import { DateRange } from '../types';

export const getTimerange = (): DateRange => {
  const since = moment();
  const until = since.subtract(CONFIG.SCAN_PERIOD_DAYS, 'days');

  return {
    since: since.toISOString(),
    until: until.toISOString(),
  };
};
