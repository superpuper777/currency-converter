import { AxiosResponse } from 'axios';

import { http } from '../index';
import { Currencies } from './dto';

export const getExchangeRates = (
  currencies: string
): Promise<AxiosResponse<Currencies>> => {
  return http.get('/exchange_rates', { params: { currencies } });
};

export const getCurrencies = (): Promise<AxiosResponse<Currencies>> => {
  return http.get('/currencies');
};
