import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import { useAppDispatch } from './store/store';
import { addCurrencies } from './store/exchangeRate/exchangeRateSlice';
import { getAdditionalCurrencies } from './store/exchangeRate/currency.selectors';
import { getCurrencies } from './store/currency/currency.selectors';
import { fetchCurrencies } from './store/currency/currencySlice';

type CurrencySelectProps = {
  isButtonClicked: boolean;
  setIsButtonClicked: (value: boolean) => void;
};

const CurrencySelect: React.FC<CurrencySelectProps> = ({
  isButtonClicked,
  setIsButtonClicked,
}: CurrencySelectProps) => {
  const dispatch = useAppDispatch();

  const currencies = useSelector(getCurrencies);

  const additionalCurrencies = useSelector(getAdditionalCurrencies);

  const lastCurrency = additionalCurrencies[additionalCurrencies.length - 1];

  const handleChange = (event: SelectChangeEvent<string>) => {
    dispatch(addCurrencies(event.target.value));
    // setIsButtonClicked(false);
  };

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  return (
    <FormControl sx={{ m: 1, width: '25ch' }}>
      <InputLabel id="select-label">Currency</InputLabel>
      <Select
        labelId="select-label"
        id="select"
        value={lastCurrency || ''}
        label="Currency"
        onChange={handleChange}
        // open={isButtonClicked}
      >
        {currencies?.map(({ code, name }) => (
          <MenuItem key={code} value={code}>
            {code} {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CurrencySelect;
