export type Currencies = Array<Currency> | Array<CurrencySelectType>;

export interface Currency {
  code: string;
  value: number;
}

export interface CurrencySelectType {
  code: string;
  name: string;
}
