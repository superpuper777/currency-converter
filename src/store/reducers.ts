import { combineReducers } from 'redux';

import currencyReducer from './currency/currencySlice';

const rootReducer = combineReducers({
  currency: currencyReducer,
});

export default rootReducer;
