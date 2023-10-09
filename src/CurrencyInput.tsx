import { MouseEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { css } from '@emotion/css';

import { useAppDispatch } from './store/store';
import {
  fetchExchangeRates,
  removeCurrency,
  changeInput,
  changeBaseCurrency,
} from './store/exchangeRate/exchangeRateSlice';
import {
  getExchangeRates,
  getStatus,
  getAdditionalCurrencies,
  getInpitValue,
  getBaseCurrency,
} from './store/exchangeRate/currency.selectors';

const CurrencyInput: React.FC = () => {
  const dispatch = useAppDispatch();

  const inputValue = useSelector(getInpitValue);
  const currencies = useSelector(getExchangeRates);
  const status = useSelector(getStatus);
  const additionalCurrencies = useSelector(getAdditionalCurrencies);
  const curriencesString = additionalCurrencies.join(',');
  const baseCurrency = useSelector(getBaseCurrency);

  // React.ChangeEvent<HTMLInputElement>;
  const handleValueChange = (event: any, code: string) => {
    dispatch(changeInput(event.target.value));
    dispatch(changeBaseCurrency(code));
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
  }, [dispatch, curriencesString, inputValue, baseCurrency]);

  return (
    <>
      {status === 'pending' && <div>loading...</div>}
      {status === 'failed' && <div>error</div>}
      {status === 'succeeded' && (
        <div
          className={css`
            padding-bottom: 30px;
            display: flex;
            align-items: center;
            flex-direction: column;
          `}>
          {currencies?.map(({ code, value }) => (
            <div
              key={code}
              className={css`
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: row;
              `}>
              <FormControl
                key={code}
                sx={{ m: 1, width: '25ch' }}
                variant="outlined">
                <InputLabel htmlFor="currency">{code}</InputLabel>
                <OutlinedInput
                  id="currency"
                  label={code}
                  defaultValue={value || ''}
                  onChange={(e) => handleValueChange(e, code)}
                />
              </FormControl>
              {additionalCurrencies.includes(code) && (
                <IconButton
                  aria-label="delete"
                  onClick={(e) => handleDelete(e, code)}>
                  <Delete />
                </IconButton>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CurrencyInput;
