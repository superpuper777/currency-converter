import { useState } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";

const CurrencyRow: React.FC = () => {
  const [value, setValue] = useState("");

  function handleValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.currentTarget.value);
    setValue(event.currentTarget.value);
  }

  return (
    <>
      <div>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="currency">USD</InputLabel>
          <OutlinedInput
            id="currency"
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              "aria-label": "weight",
            }}
            label="USD"
            onChange={handleValueChange}
            value={value}
          />
          <FormHelperText sx={{ alignSelf: "end" }}>доллар США</FormHelperText>
        </FormControl>
      </div>
    </>
  );
};

export default CurrencyRow;
