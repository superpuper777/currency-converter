import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getExchangeRates } from '../../api/currency';
import { Currencies } from '../../api/currency/dto';

export const fetchExchangeRates = createAsyncThunk(
  'exchangeRate/fetchExchangeRates',
  async ({
    currencies,
    value,
    baseCurrency,
  }: {
    currencies: string;
    value: string;
    baseCurrency: string;
  }) => {
    const response = await getExchangeRates(currencies, value, baseCurrency);
    return response.data;
  }
);

interface CurrenciesState {
  exchangeRate: Currencies | null;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  extraCurrencies: Array<string>;
  baseCurrency: string;
  value: string;
}

const initialState: CurrenciesState = {
  exchangeRate: null,
  status: 'idle',
  extraCurrencies: [],
  baseCurrency: 'USD',
  value: '1',
};

const exchangeRateSlice = createSlice({
  name: 'exchangeRate',
  initialState,
  reducers: {
    addCurrencies(state, action) {
      state.extraCurrencies.push(action.payload);
    },
    removeCurrency(state, action) {
      state.extraCurrencies = state.extraCurrencies.filter(
        (cur) => cur !== action.payload
      );
    },
    changeInput(state, action) {
      state.value = action.payload;
    },
    changeBaseCurrency(state, action) {
      state.baseCurrency = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchExchangeRates.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(fetchExchangeRates.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(fetchExchangeRates.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.exchangeRate = action.payload;
    });
  },
});

export const {
  addCurrencies,
  removeCurrency,
  changeInput,
  changeBaseCurrency,
} = exchangeRateSlice.actions;
export default exchangeRateSlice.reducer;
