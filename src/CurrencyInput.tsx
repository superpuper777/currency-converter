import { MouseEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDebounce } from 'usehooks-ts';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  CircularProgress,
  Box,
  InputAdornment,
} from '@mui/material';

import { Delete } from '@mui/icons-material';
import { css } from '@emotion/css';

import { useAppDispatch } from './store/store';
import {
  fetchExchangeRates,
  removeCurrency,
  changeInput,
} from './store/exchangeRate/exchangeRateSlice';
import {
  getExchangeRates,
  getStatus,
  getAdditionalCurrencies,
  getInpitValue,
  getBaseCurrency,
} from './store/exchangeRate/currency.selectors';
import { Currency } from './api/currency/dto';

const CurrencyInput: React.FC = () => {
  const dispatch = useAppDispatch();

  const inputValue = useSelector(getInpitValue);
  const currencies = useSelector(getExchangeRates);
  const status = useSelector(getStatus);
  const additionalCurrencies = useSelector(getAdditionalCurrencies);
  const curriencesString = additionalCurrencies.join(',');
  const baseCurrency = useSelector(getBaseCurrency);

  const debouncedValue = useDebounce<string>(inputValue, 2000);

  // React.ChangeEvent<HTMLInputElement>;
  const handleValueChange = (event: any, code: string) => {
    dispatch(changeInput({ value: event.target.value, baseCurrency: code }));
  };

  const handleDelete = (event: MouseEvent<HTMLButtonElement>, code: string) => {
    dispatch(removeCurrency(code));
  };

  useEffect(() => {
    dispatch(
      fetchExchangeRates({
        currencies: curriencesString,
        value: inputValue,
        baseCurrency: baseCurrency,
      })
    );
  }, [dispatch, curriencesString, debouncedValue]);

  return (
    <>
      {status === 'pending' && (
        <Box>
          <CircularProgress />
        </Box>
      )}
      {status === 'failed' && <p>Ups! Something went wrong</p>}
      {status === 'succeeded' && (
        <main
          className={css`
            padding-bottom: 30px;
            display: flex;
            align-items: center;
            flex-direction: column;
          `}>
          {currencies?.map(({ code, value }) => (
            <FormControl
              key={code}
              sx={{ m: 1, width: '25ch' }}
              variant="outlined">
              <InputLabel htmlFor="currency">{code}</InputLabel>
              <OutlinedInput
                id="currency"
                label={code}
                defaultValue={value || inputValue}
                onChange={(e) => handleValueChange(e, code)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={(e) => handleDelete(e, code)}
                      edge="end">
                      {additionalCurrencies.includes(code) && <Delete />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          ))}
        </main>
      )}
    </>
  );
};

export default CurrencyInput;
