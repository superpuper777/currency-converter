import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCurrencies } from '../../api/currency';
import { Currencies } from '../../api/currency/dto';

export const fetchCurrencies = createAsyncThunk(
  'currency/fetchCurrencies',
  async () => {
    const response = await getCurrencies();
    return response.data;
  }
);

interface CurrenciesState {
  currency: Currencies | null;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: CurrenciesState = {
  currency: null,
  status: 'idle',
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrencies.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(fetchCurrencies.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(fetchCurrencies.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.currency = action.payload;
    });
  },
});

export default currencySlice.reducer;
