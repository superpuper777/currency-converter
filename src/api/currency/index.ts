import { AxiosResponse } from 'axios';

import { http } from '../index';
import { Currencies } from './dto';

export const getCurrencies = (): Promise<AxiosResponse<Currencies>> => {
  return http.get('/currencies');
};
