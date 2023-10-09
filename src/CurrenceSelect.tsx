import React from 'react';
import { useSelector } from 'react-redux';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import { useAppDispatch } from './store/store';
import { addCurrencies } from './store/currency/currencySlice';
import { getAdditionalCurrencies } from './store/currency/currency.selectors';
import { useLocation } from 'react-router-dom';

const currencies = [
  {
    code: 'AED',
    name: 'United Arab Emirates Dirham',
  },
  {
    code: 'AFN',
    name: 'Afghan Afghani',
  },
  {
    code: 'ALL',
    name: 'Albanian Lek',
  },
];

type CurrencySelectProps = {
  isButtonClicked: boolean;
  setIsButtonClicked: (value: boolean) => void;
};

const CurrencySelect: React.FC<CurrencySelectProps> = ({
  isButtonClicked,
  setIsButtonClicked,
}: CurrencySelectProps) => {
  const { search, pathname } = useLocation();
  const queryParams = new URLSearchParams(search);

  const additionalCurrencies = useSelector(getAdditionalCurrencies);
  const dispatch = useAppDispatch();
  console.log(additionalCurrencies);
  const lastCurrency = additionalCurrencies[additionalCurrencies.length - 1];

  const handleChange = (event: SelectChangeEvent<string>) => {
    dispatch(addCurrencies(event.target.value));
    console.log(typeof event.target.value);
    queryParams.append('currencies', additionalCurrencies.join(','));
    // setIsButtonClicked(false);
    console.log(queryParams);
  };

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
