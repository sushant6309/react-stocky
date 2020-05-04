import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import {
  DAILY_PRICE,
  DAILY_PRICE_SUCCESS,
  DAILY_PRICE_FAILED,
} from './actions';
const API_KEY = '27DOW7XX37RSBZ89';
function* getDailyStockPrice(action) {
  try {
    const priceRequest = yield call(
      request,
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${
        action.payload.symbol
      }&interval=5min&outputsize=compact&apikey=${API_KEY}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      },
    );

    const response = yield priceRequest;
    if (response && response['Error Message']) {
      yield put({
        type: DAILY_PRICE_FAILED,
        payload: { response: [] },
      });
    } else if (response) {
      yield put({
        type: DAILY_PRICE_SUCCESS,
        payload: { response },
      });
    } else {
      yield put({
        type: DAILY_PRICE_FAILED,
        payload: { response: [] },
      });
    }
  } catch (e) {
    console.debug(e);
    yield put({
      type: DAILY_PRICE_FAILED,
      payload: { response: [] },
    });
  }
}

export default function* watcher() {
  yield takeLatest(DAILY_PRICE, getDailyStockPrice);
}
