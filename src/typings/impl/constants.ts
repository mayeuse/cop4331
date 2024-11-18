import { addDays, addMonths } from 'date-fns';

export const Intervals = {
    WEEKLY: addDays(new Date(), 7),
    BIWEEKLY: addDays(new Date(), 14),
    MONTHLY: addMonths(new Date(), 1)
  };