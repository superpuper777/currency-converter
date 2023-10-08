import { RootState } from '../store';

export const getCurrencies = (state: RootState) => state.currency.currency;
export const getStatus = (state: RootState) => state.currency.status;
