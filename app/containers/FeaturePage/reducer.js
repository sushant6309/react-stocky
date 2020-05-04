/* eslint-disable no-case-declarations */
import produce from 'immer';
import {
  DAILY_PRICE,
  DAILY_PRICE_SUCCESS,
  DAILY_PRICE_FAILED,
} from './actions';

export const initialState = {
  dailyPrice: [],
  myList: [],
};

const stockPricingReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DAILY_PRICE:
        // eslint-disable-next-line no-param-reassign
        draft.dailyPrice = [];
        break;
      case DAILY_PRICE_SUCCESS:
        const { response } = action.payload;
        if (response) {
          const chartData = [];
          const res = response['Time Series (Daily)'];
          const resKeys = Object.keys(res);
          let maxHigh = parseInt(res[resKeys[0]]['2. high'], 10);
          let maxVolume = parseInt(res[resKeys[0]]['5. volume'], 10);
          resKeys.forEach(date => {
            const high = parseInt(res[date]['2. high'], 10);
            const volume = parseInt(res[date]['5. volume'], 10);
            maxHigh = Math.max(high, maxHigh);
            maxVolume = Math.max(volume, maxVolume);
            chartData.push({
              date,
              high,
              volume,
            });
          });
          const symbol = response['Meta Data']['2. Symbol'].toUpperCase();
          const isPresent = state.myList.filter(
            stock => stock.symbol === symbol,
          );

          if (isPresent.length === 0) {
            const { myList } = state;
            myList.push({ symbol, maxHigh, maxVolume });
            // eslint-disable-next-line no-param-reassign
            draft.myList = myList;
          }

          // eslint-disable-next-line no-param-reassign
          draft.dailyPrice = chartData;
        }
        break;
      case DAILY_PRICE_FAILED:
        // eslint-disable-next-line no-param-reassign
        draft.dailyPrice = [];
        break;
      default:
        break;
    }
  });
export default stockPricingReducer;
