import { combineReducers } from 'redux';

import exchangeRateSlice from './exchangeRate/exchangeRateSlice';
import currencySlice from './currency/currencySlice';

const rootReducer = combineReducers({
  exchangeRate: exchangeRateSlice,
  currency: currencySlice,
});

export default rootReducer;
