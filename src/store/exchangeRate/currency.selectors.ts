import { RootState } from '../store';

export const getExchangeRates = (state: RootState) =>
  state.exchangeRate.exchangeRate;
export const getStatus = (state: RootState) => state.exchangeRate.status;

export const getAdditionalCurrencies = (state: RootState) =>
  state.exchangeRate.extraCurrencies;

export const getInpitValue = (state: RootState) => state.exchangeRate.value;

export const getBaseCurrency = (state: RootState) =>
  state.exchangeRate.baseCurrency;
