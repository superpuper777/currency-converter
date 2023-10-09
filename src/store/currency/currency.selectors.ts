import { RootState } from '../store';

export const getCurrencies = (state: RootState) => state.currency.allcurrencies;
