import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { css } from '@emotion/css';

import { useAppDispatch } from './store/store';
import { fetchCurrencies } from './store/currency/currencySlice';
import { getCurrencies, getStatus } from './store/currency/currency.selectors';

const CurrencyInput: React.FC = () => {
  const dispatch = useAppDispatch();

  const currencies = useSelector(getCurrencies);
  const status = useSelector(getStatus);

  function handleValueChange(event: React.ChangeEvent<HTMLInputElement>) {}

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

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
          {currencies?.currency?.map(({ value, code }) => (
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
          ))}
        </div>
      )}
    </>
  );
};

export default CurrencyInput;
