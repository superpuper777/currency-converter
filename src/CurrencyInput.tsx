import { MouseEvent, MouseEventHandler, useEffect } from 'react';
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
} from './store/currency/currencySlice';
import {
  getExchangeRates,
  getStatus,
  getAdditionalCurrencies,
} from './store/currency/currency.selectors';

const CurrencyInput: React.FC = () => {
  // const params = new URLSearchParams(search);

  const dispatch = useAppDispatch();

  const currencies = useSelector(getExchangeRates);

  console.log(currencies);
  const status = useSelector(getStatus);
  const additionalCurrencies = useSelector(getAdditionalCurrencies);
  function handleValueChange(event: React.ChangeEvent<HTMLInputElement>) {}
  // event: MouseEvent<HTMLButtonElement>;
  const handleDelete = (event: MouseEvent<HTMLButtonElement>, code: string) => {
    dispatch(removeCurrency(code));
    console.log(event.target, code);
    // queryParams.append('currencies', additionalCurrencies.join(','));
  };

  console.log(additionalCurrencies);
  useEffect(() => {
    dispatch(fetchExchangeRates(additionalCurrencies.join(',')));
  }, [dispatch, additionalCurrencies]);

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
                  value={value}
                  onChange={handleValueChange}
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
