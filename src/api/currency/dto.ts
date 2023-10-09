export type Currencies = Array<Currency>;

export interface Currency {
  code: string;
  value: number;
}

export type AllCurrencies = Array<CurrencySelectType>;
export interface CurrencySelectType {
  code: string;
  name: string;
}
