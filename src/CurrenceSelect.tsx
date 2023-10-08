import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';

const currencies = {
  currency: [
    {
      value: 1.2,
      code: 'EUR',
    },
    { value: 3, code: 'BYN' },
    { value: 1, code: 'USD' },
  ],
};

type CurrencySelectProps = {
  isButtonClicked: boolean;
  setIsButtonClicked: (value: boolean) => void;
};

const CurrencySelect: React.FC<CurrencySelectProps> = ({
  isButtonClicked,
  setIsButtonClicked,
}: CurrencySelectProps) => {
  const [selectedCurrency, setSelectedCurrency] = useState('');

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedCurrency(event.target.value);
    console.log(selectedCurrency);
    // setIsButtonClicked(false);
  };
  console.log(selectedCurrency);
  return (
    <FormControl sx={{ m: 1, width: '25ch' }}>
      <InputLabel id="select-label">Currency</InputLabel>
      <Select
        labelId="select-label"
        id="select"
        value={selectedCurrency}
        label="Currency"
        onChange={handleChange}
        // open={isButtonClicked}
      >
        {currencies.currency?.map(({ value, code }) => (
          <MenuItem key={code} value={code}>
            {code}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CurrencySelect;
