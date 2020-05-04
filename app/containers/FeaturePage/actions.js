export const DAILY_PRICE = 'DAILY_PRICE';
export const DAILY_PRICE_SUCCESS = 'DAILY_PRICE_SUCCESS';
export const DAILY_PRICE_FAILED = 'DAILY_PRICE_FAILED';

export const fetchDailyPrice = payload => ({
  type: DAILY_PRICE,
  payload,
});
