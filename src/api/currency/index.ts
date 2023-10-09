import { AxiosResponse } from 'axios';

import { http } from '../index';
import { Currencies, AllCurrencies } from './dto';
//: Promise<AxiosResponse<Currencies>>
export const getExchangeRates = (
  currencies: string,
  inputValue: string,
  baseCurrency: string
) => {
  return http.get('/exchange_rates', {
    params: { currencies, value: inputValue, base_currency: baseCurrency },
  });
};

export const getCurrencies = (): Promise<AxiosResponse<AllCurrencies>> => {
  return http.get('/currencies');
};
